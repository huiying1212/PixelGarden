import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from './lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount < maxRetries) {
        try {
          const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('登录错误:', error.message);
            // 如果是网络错误且还有重试机会，继续重试
            if (error.message === 'Network request failed' && retryCount < maxRetries - 1) {
              console.log(`登录重试中... (${retryCount + 1}/${maxRetries})`);
              retryCount++;
              // 等待短暂时间后重试
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            handleAuthError(error);
            return;
          }

          if (session) {
            // 检查邮箱是否已验证
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError) {
              console.error('获取用户信息失败:', userError);
              Alert.alert('错误', '获取用户信息失败，请重试');
              return;
            }

            if (!user?.email_confirmed_at) {
              handleUnverifiedEmail(email);
              return;
            }

            console.log('登录成功，session:', session);
            router.replace("/");
            return;
          }
        } catch (error: any) {
          // 如果是网络错误且还有重试机会，继续重试
          if (error.message === 'Network request failed' && retryCount < maxRetries - 1) {
            console.log(`登录重试中... (${retryCount + 1}/${maxRetries})`);
            retryCount++;
            // 等待短暂时间后重试
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          throw error;
        }
      }
    } catch (error: any) {
      console.error('登录过程发生错误:', error);
      Alert.alert('错误', '登录过程发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.message === 'Invalid login credentials') {
      Alert.alert(
        "登录失败",
        "邮箱或密码错误。\n\n" +
        "请检查：\n" +
        "1. 邮箱地址是否正确\n" +
        "2. 密码是否正确\n" +
        "3. 是否已完成邮箱验证\n\n" +
        "如果忘记密码，请联系管理员。"
      );
    } else if (error.message.includes('Email not confirmed')) {
      handleUnverifiedEmail(email);
    } else {
      Alert.alert("登录失败", error.message);
    }
  };

  const handleUnverifiedEmail = (email: string) => {
    Alert.alert(
      "邮箱未验证",
      "您的邮箱尚未验证。\n\n" +
      "请检查您的邮箱并点击验证链接。\n" +
      "如果没有收到验证邮件，请检查垃圾邮件文件夹。\n\n" +
      "是否重新发送验证邮件？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "重新发送",
          onPress: async () => {
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email,
            });
            if (resendError) {
              Alert.alert("错误", "重新发送验证邮件失败：" + resendError.message);
            } else {
              Alert.alert("成功", "验证邮件已重新发送，请查收。");
            }
          }
        }
      ]
    );
  };

  const checkAndCreateUserProfile = async (user: any) => {
    console.log('检查用户资料...');
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('检查用户资料时出错:', profileError);
      Alert.alert("错误", "检查用户资料失败：" + profileError.message);
      return null;
    }

    if (!profileData) {
      console.log('用户资料不存在，正在创建...');
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            user_id: user.id,
            name: user.user_metadata?.name || '未设置用户名',
            age: user.user_metadata?.age || null,
            gender: user.user_metadata?.gender || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) {
        console.error('创建用户资料失败:', insertError);
        Alert.alert("错误", "创建用户资料失败：" + insertError.message);
        return null;
      }

      // 创建初始记录
      await createInitialRecords(user.id);
    }

    return profileData;
  };

  const createInitialRecords = async (userId: string) => {
    // 创建身体健康记录
    const { error: physicalError } = await supabase
      .from('physical_health')
      .insert([
        {
          user_id: userId,
          weight: null,
          height: null,
          heart_rate: null,
          blood_pressure: null,
          sleep_duration: null,
          steps: null,
          recorded_at: new Date().toISOString()
        }
      ]);

    if (physicalError) {
      console.error('创建身体健康记录失败:', physicalError);
      Alert.alert("警告", "创建身体健康记录失败：" + physicalError.message);
    }

    // 创建心理健康记录
    const { error: mentalError } = await supabase
      .from('mental_health')
      .insert([
        {
          user_id: userId,
          mood: null,
          stress_level: null,
          journal_entry: {},
          meditation_time: null,
          recorded_at: new Date().toISOString()
        }
      ]);

    if (mentalError) {
      console.error('创建心理健康记录失败:', mentalError);
      Alert.alert("警告", "创建心理健康记录失败：" + mentalError.message);
    }

    // 创建应用使用记录
    const { error: usageError } = await supabase
      .from('app_usage')
      .insert([
        {
          user_id: userId,
          duration: 0,
          timestamp: new Date().toISOString()
        }
      ]);

    if (usageError) {
      console.error('创建应用使用记录失败:', usageError);
      Alert.alert("警告", "创建应用使用记录失败：" + usageError.message);
    }
  };

  const handleSuccessfulLogin = async (user: any, profileData: any) => {
    console.log('登录成功，保存用户信息...');
    const userInfo = {
      id: user.id,
      email: user.email,
      username: profileData?.name || user.user_metadata?.name || '未设置用户名',
      age: profileData?.age || user.user_metadata?.age || null,
      gender: profileData?.gender || user.user_metadata?.gender || null,
    };
    
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('用户信息已保存:', userInfo);
      
      // 直接跳转
      console.log('用户确认登录成功，跳转到首页');
      router.replace("/");
    } catch (error) {
      console.error('保存用户信息失败:', error);
      Alert.alert("错误", "保存用户信息失败，请重试");
    }
  };

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert("错误", "请填写邮箱和密码");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      
      <TextInput 
        placeholder="邮箱" 
        style={styles.input} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput 
        placeholder="密码" 
        secureTextEntry 
        style={styles.input} 
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[styles.loginButton, isLoading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>登录</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => router.push("/register")}
        disabled={isLoading}
      >
        <Text style={styles.registerButtonText}>注册新账号</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f0f0f0" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  input: { 
    width: 250, 
    height: 40, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    marginBottom: 10, 
    paddingLeft: 10, 
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  loginButton: { 
    backgroundColor: "#4CAF50", 
    padding: 10, 
    borderRadius: 5,
    width: 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    backgroundColor: "#cccccc"
  },
  registerButton: {
    marginTop: 10,
    padding: 10,
    width: 250,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5
  },
  buttonText: { 
    color: "white", 
    fontSize: 16 
  },
  registerButtonText: {
    color: "#4CAF50",
    fontSize: 16
  }
});

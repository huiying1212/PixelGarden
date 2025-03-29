import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './lib/supabase';
import { decode } from 'base64-arraybuffer';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const validateEmail = async (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱不能为空" }));
      setErrors(prev => ({ ...prev, email: true }));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱格式错误" }));
      setErrors(prev => ({ ...prev, email: true }));
      return false;
    }

    // 移除邮箱验证检查，改为在注册时处理
    setErrorMessages(prev => ({ ...prev, email: "" }));
    setErrors(prev => ({ ...prev, email: false }));
    return true;
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, password: "密码不能为空" }));
      setErrors(prev => ({ ...prev, password: true }));
      return false;
    }
    if (text.length < 6) {
      setErrorMessages(prev => ({ ...prev, password: "密码长度不足" }));
      setErrors(prev => ({ ...prev, password: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, password: "" }));
    setErrors(prev => ({ ...prev, password: false }));
    return true;
  };

  const validateConfirmPassword = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, confirmPassword: "请确认密码" }));
      setErrors(prev => ({ ...prev, confirmPassword: true }));
      return false;
    }
    if (text !== password) {
      setErrorMessages(prev => ({ ...prev, confirmPassword: "两次输入的密码不一致" }));
      setErrors(prev => ({ ...prev, confirmPassword: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, confirmPassword: "" }));
    setErrors(prev => ({ ...prev, confirmPassword: false }));
    return true;
  };

  const validateUsername = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, username: "用户名不能为空" }));
      setErrors(prev => ({ ...prev, username: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, username: "" }));
    setErrors(prev => ({ ...prev, username: false }));
    return true;
  };

  const validateInputs = async () => {
    const emailValid = await validateEmail(email);
    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validateConfirmPassword(confirmPassword);
    const usernameValid = validateUsername(username);

    return emailValid && passwordValid && confirmPasswordValid && usernameValid;
  };

  const handleRegister = async () => {
    // 防止重复提交
    if (isSubmitting) {
      Alert.alert("提示", "请勿重复点击注册按钮");
      return;
    }

    // 如果已经注册成功，直接返回
    if (registrationSuccess) {
      Alert.alert("提示", "您已经成功注册，请检查邮箱完成验证。");
      router.back();
      return;
    }

    // 检查是否在冷却时间内
    const now = Date.now();
    const timeSinceLastAttempt = now - lastAttemptTime;
    if (timeSinceLastAttempt < 60000) { // 60秒冷却时间
      const remainingTime = Math.ceil((60000 - timeSinceLastAttempt) / 1000);
      Alert.alert(
        "请稍候",
        `由于安全限制，请等待${remainingTime}秒后再尝试注册。\n\n` +
        "在此期间，您可以：\n" +
        "1. 检查邮箱是否已收到验证邮件\n" +
        "2. 确认邮箱地址是否正确\n" +
        "3. 等待冷却时间结束后重试"
      );
      return;
    }

    const isValid = await validateInputs();
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      setIsLoading(true);
      console.log('开始注册流程...', { email, username });

      // 添加初始延迟
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 1. 创建认证用户
      console.log('正在创建认证用户...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: username,
            age: age || null,
            gender: gender || null,
          },
        },
      });

      if (authError) {
        console.error('注册错误详情:', authError);
        
        // 处理频率限制错误
        if (authError.message.includes('seconds')) {
          const waitTime = authError.message.match(/\d+/)?.[0] || '60';
          setLastAttemptTime(now);
          
          // 如果等待时间小于5秒，自动等待后重试
          if (parseInt(waitTime) < 5) {
            Alert.alert(
              "请稍候",
              `等待${waitTime}秒后自动重试...`,
              [{ text: "确定" }]
            );
            await new Promise(resolve => setTimeout(resolve, parseInt(waitTime) * 1000));
            handleRegister(); // 自动重试
            return;
          }

          Alert.alert(
            "注册失败",
            `由于安全限制，请等待约${waitTime}秒后再尝试注册。\n\n` +
            "在此期间，您可以：\n" +
            "1. 检查邮箱是否已收到验证邮件\n" +
            "2. 确认邮箱地址是否正确\n" +
            "3. 等待一段时间后重试",
            [
              { 
                text: "确定", 
                onPress: () => {
                  console.log('用户确认，返回登录页面');
                  router.back();
                }
              }
            ]
          );
        } else {
          handleAuthError(authError);
        }
        return;
      }

      if (!authData.user) {
        console.error('注册失败：未能创建用户');
        Alert.alert("错误", "注册失败：未能创建用户");
        return;
      }

      console.log('认证用户创建成功:', authData);
      setLastAttemptTime(now);

      // 显示成功提示
      Alert.alert(
        "注册成功", 
        "请检查您的邮箱，点击验证链接完成注册。\n\n" +
        "如果没有收到邮件，请：\n" +
        "1. 检查垃圾邮件文件夹\n" +
        "2. 等待1-2分钟\n" +
        "3. 确认邮箱地址是否正确", 
        [
          { 
            text: "确定", 
            onPress: () => {
              console.log('用户确认注册成功，返回登录页面');
              router.back();
            }
          },
          {
            text: "重新发送验证邮件",
            onPress: async () => {
              try {
                // 检查是否在冷却时间内
                const now = Date.now();
                const timeSinceLastAttempt = now - lastAttemptTime;
                if (timeSinceLastAttempt < 60000) {
                  const remainingTime = Math.ceil((60000 - timeSinceLastAttempt) / 1000);
                  Alert.alert(
                    "请稍候",
                    `由于安全限制，请等待${remainingTime}秒后再尝试发送验证邮件。\n\n` +
                    "在此期间，请检查垃圾邮件文件夹。"
                  );
                  return;
                }

                // 添加延迟
                await new Promise(resolve => setTimeout(resolve, 2000));

                const { error: retryError } = await supabase.auth.resend({
                  type: 'signup',
                  email,
                });
                if (retryError) {
                  if (retryError.message.includes('seconds')) {
                    const waitTime = retryError.message.match(/\d+/)?.[0] || '60';
                    setLastAttemptTime(now);
                    Alert.alert(
                      "发送失败",
                      `请等待约${waitTime}秒后再尝试发送验证邮件。\n\n` +
                      "在此期间，请检查垃圾邮件文件夹。"
                    );
                  } else {
                    Alert.alert("错误", "重新发送验证邮件失败：" + retryError.message);
                  }
                } else {
                  Alert.alert("成功", "验证邮件已重新发送，请查收。");
                  setLastAttemptTime(now);
                }
              } catch (error) {
                Alert.alert("错误", "重新发送验证邮件时发生错误，请稍后重试。");
              }
            }
          }
        ]
      );

      // 设置注册成功状态
      setRegistrationSuccess(true);

    } catch (error: any) {
      console.error("注册过程发生错误:", error);
      Alert.alert(
        "错误",
        error.message || "注册过程中出现错误，请稍后重试"
      );
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.message.includes('User already registered')) {
      Alert.alert(
        "邮箱已注册",
        "该邮箱已被注册。\n\n" +
        "请直接登录或使用其他邮箱注册。",
        [
          { text: "去登录", onPress: () => router.push("/login") },
          { text: "取消", style: "cancel" }
        ]
      );
    } else if (error.message.includes('Invalid email')) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱格式错误" }));
      setErrors(prev => ({ ...prev, email: true }));
    } else if (error.message.includes('Password should be at least')) {
      setErrorMessages(prev => ({ ...prev, password: "密码长度不足" }));
      setErrors(prev => ({ ...prev, password: true }));
    } else {
      Alert.alert("注册失败", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
        disabled={isLoading}
      >
        <Image source={require("../assets/images/image.png")} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>注册新账号</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="邮箱"
          style={[styles.input, errors.email && styles.errorInput]}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        {errors.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="用户名"
          style={[styles.input, errors.username && styles.errorInput]}
          onChangeText={(text) => {
            setUsername(text);
            validateUsername(text);
          }}
          value={username}
          editable={!isLoading}
        />
        {errors.username && <Text style={styles.errorText}>{errorMessages.username}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="密码"
          style={[styles.input, errors.password && styles.errorInput]}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
            if (confirmPassword) validateConfirmPassword(confirmPassword);
          }}
          value={password}
          editable={!isLoading}
        />
        {errors.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="确认密码"
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          secureTextEntry
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateConfirmPassword(text);
          }}
          value={confirmPassword}
          editable={!isLoading}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="年龄（可选）"
          style={[styles.input, styles.optionalInput]}
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="性别（可选）"
          style={[styles.input, styles.optionalInput]}
          onChangeText={setGender}
          value={gender}
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.registerButton, (isLoading || isSubmitting) && styles.disabledButton]} 
        onPress={handleRegister}
        disabled={isLoading || isSubmitting}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>注册</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 50
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10
  },
  backIcon: {
    width: 24,
    height: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30
  },
  inputContainer: {
    width: 250,
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  errorInput: {
    borderColor: "#ff0000",
    borderWidth: 1
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 2
  },
  registerButton: {
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
  buttonText: {
    color: "white",
    fontSize: 16
  },
  optionalInput: {
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd'
  }
}); 
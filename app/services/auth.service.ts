import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import supabase from '../config/supabase';

// 登录函数
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { session };
  } catch (error) {
    throw error;
  }
};

// 处理邮箱未验证
export const handleUnverifiedEmail = async (email: string) => {
  return new Promise<boolean>((resolve) => {
    Alert.alert(
      "邮箱未验证",
      "您的邮箱尚未验证。\n\n" +
      "请检查您的邮箱并点击验证链接。\n" +
      "如果没有收到验证邮件，请检查垃圾邮件文件夹。\n\n" +
      "是否重新发送验证邮件？",
      [
        {
          text: "取消",
          style: "cancel",
          onPress: () => resolve(false)
        },
        {
          text: "重新发送",
          onPress: async () => {
            try {
              const { error: resendError } = await supabase.auth.signUp({
                email,
                password: '', // 空密码，因为我们只是重新发送验证邮件
              });
              
              if (resendError) {
                Alert.alert("错误", "重新发送验证邮件失败：" + resendError.message);
                resolve(false);
              } else {
                Alert.alert("成功", "验证邮件已重新发送，请查收。");
                resolve(true);
              }
            } catch (error: any) {
              Alert.alert("错误", "重新发送验证邮件失败：" + error.message);
              resolve(false);
            }
          }
        }
      ]
    );
  });
};

// 检查并创建用户资料
export const checkAndCreateUserProfile = async (user: any) => {
  console.log('检查用户资料...');
  try {
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

    return profileData || { user_id: user.id }; // 确保即使是新创建的用户也返回一个对象
  } catch (error) {
    console.error('检查用户资料时发生错误:', error);
    return null;
  }
};

// 创建初始记录
export const createInitialRecords = async (userId: string) => {
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
        journal_entry: null,
        meditation_time: null,
        recorded_at: new Date().toISOString()
      }
    ]);

  if (mentalError) {
    console.error('创建心理健康记录失败:', mentalError);
    Alert.alert("警告", "创建心理健康记录失败：" + mentalError.message);
  }
};

// 处理成功登录
export const handleSuccessfulLogin = async (user: any, profileData: any) => {
  try {
    // 存储用户信息到 AsyncStorage
    const userData = {
      id: user.id,
      email: user.email,
      name: profileData?.name || user.user_metadata?.name || '未设置用户名',
    };

    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('用户数据已存储到 AsyncStorage');
    return true;
  } catch (error) {
    console.error('存储用户数据失败:', error);
    Alert.alert('警告', '登录成功，但存储用户数据失败。部分功能可能受限。');
    return false;
  }
}; 
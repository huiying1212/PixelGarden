import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useRouter } from "expo-router";
import supabase from '../config/supabase';
import { 
  signInWithEmail, 
  handleUnverifiedEmail, 
  checkAndCreateUserProfile, 
  handleSuccessfulLogin 
} from '../services/auth.service';

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const router = useRouter();
  const loginAttempted = useRef(false);

  // 处理登录成功后的跳转
  useEffect(() => {
    if (hasLoggedIn) {
      console.log('登录状态已更新，准备跳转...');
      router.replace("/");
    }
  }, [hasLoggedIn, router]);

  // 验证输入
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("输入错误", "请输入邮箱地址");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("输入错误", "请输入密码");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("输入错误", "请输入有效的邮箱地址");
      return false;
    }

    return true;
  };

  // 处理认证错误
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

  // 登录处理
  const login = async () => {
    if (!validateInputs()) return;
    
    // 防止重复提交和重复登录
    if (isLoading || isSubmitting || hasLoggedIn || loginAttempted.current) return;

    try {
      setIsLoading(true);
      setIsSubmitting(true);
      loginAttempted.current = true;
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount < maxRetries) {
        try {
          // 直接尝试登录
          const { session } = await signInWithEmail(email, password);

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

            // 获取用户资料
            const profileData = await checkAndCreateUserProfile(user);
            if (profileData) {
              const success = await handleSuccessfulLogin(user, profileData);
              if (success) {
                setHasLoggedIn(true);
              }
              return;
            }
          }
        } catch (error: any) {
          if (error.message === 'Network request failed' && retryCount < maxRetries - 1) {
            console.log(`登录重试中... (${retryCount + 1}/${maxRetries})`);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          
          // 处理特定错误类型
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
            return;
          }

          // 处理速率限制错误
          if (error.message === 'Request rate limit reached') {
            Alert.alert(
              "请求过于频繁",
              "请稍后再试。\n\n" +
              "这是为了保护您的账号安全。"
            );
            return;
          }
          
          throw error;
        }
      }
    } catch (error: any) {
      console.error('登录过程发生错误:', error);
      handleAuthError(error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      loginAttempted.current = false;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    login,
    hasLoggedIn
  };
} 
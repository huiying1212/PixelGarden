import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../config/supabase';
import { showAlert } from '../utils/alertUtils';

export interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
}

export function useProfile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取用户信息
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      // 从AsyncStorage获取用户信息
      const userDataStr = await AsyncStorage.getItem('userData');
      
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setUserInfo(userData);
      } else {
        // 如果本地没有数据，尝试从Supabase获取
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // 获取用户资料
          const { data: profileData } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (profileData) {
            const userData = {
              id: user.id,
              email: user.email,
              name: profileData.name || '未设置用户名',
            };
            
            // 保存到本地
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUserInfo(userData);
          }
        }
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录
  const confirmLogout = () => {
    Alert.alert(
      "退出登录",
      "确定要退出登录吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "确定",
          style: "destructive",
          onPress: logout
        }
      ]
    );
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // 清除本地存储的用户信息
      await AsyncStorage.multiRemove(["userData", "session"]);
      
      // 退出 Supabase 会话
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // 清除用户状态
      setUserInfo(null);
      
      // 使用 replace 而不是 push，防止用户通过返回按钮回到需要登录的页面
      router.replace("/login");
    } catch (error: any) {
      console.error("退出登录失败:", error);
      showAlert("错误", "退出登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userInfo,
    isLoading,
    fetchUserInfo,
    confirmLogout,
    logout
  };
} 
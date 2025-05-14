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
  const [journalEntry, setJournalEntry] = useState<string | null>(null);

  // 获取用户信息
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 获取最新日记条目
  useEffect(() => {
    if (userInfo?.id) {
      fetchLatestJournalEntry(userInfo.id);
    }
  }, [userInfo]);

  const fetchLatestJournalEntry = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('mental_health')
        .select('journal_entry, recorded_at')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("获取日记条目失败:", error);
        return;
      }

      // 检查记录是否是当天的
      const isToday = checkIfRecordIsToday(data?.recorded_at);
      
      // 如果不是当天的记录，直接返回null
      if (!isToday) {
        setJournalEntry(null);
        return;
      }

      // 处理 journal_entry 数据
      if (data && data.journal_entry) {
        try {
          const journalData: any = data.journal_entry;
          
          // 如果是字符串，尝试解析为 JSON
          if (typeof journalData === 'string') {
            try {
              const parsed = JSON.parse(journalData);
              setJournalEntry(parsed.content || null);
            } catch {
              setJournalEntry(journalData);
            }
          } 
          // 如果是对象或数组
          else if (typeof journalData === 'object' && journalData !== null) {
            if (Array.isArray(journalData) && journalData.length > 0) {
              setJournalEntry(journalData[0].content || null);
            } else {
              setJournalEntry(journalData.content || null);
            }
          } 
          // 其他情况
          else {
            setJournalEntry(String(journalData) || null);
          }
        } catch (error) {
          console.error("处理日记数据失败:", error);
          setJournalEntry(null);
        }
      } else {
        setJournalEntry(null);
      }
    } catch (error) {
      console.error("获取日记条目失败:", error);
      setJournalEntry(null);
    }
  };

  // 检查记录是否是当天添加的
  const checkIfRecordIsToday = (recordedAt: string | null): boolean => {
    if (!recordedAt) return false;
    
    const recordDate = new Date(recordedAt);
    const today = new Date();
    
    return recordDate.getDate() === today.getDate() && 
           recordDate.getMonth() === today.getMonth() && 
           recordDate.getFullYear() === today.getFullYear();
  };

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
    logout,
    journalEntry
  };
} 
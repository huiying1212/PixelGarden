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

export interface PhysicalHealthData {
  steps: number | null;
  calories: number | null;
  sleep_duration: number | null;
}

export function useProfile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [journalEntry, setJournalEntry] = useState<string | null>(null);
  const [gardenSnapshot, setGardenSnapshot] = useState<string | null>(null);
  const [gardenId, setGardenId] = useState<number | null>(null);
  const [physicalHealth, setPhysicalHealth] = useState<PhysicalHealthData | null>(null);

  // 获取用户信息
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 获取最新日记条目 (只在初始化时调用)
  useEffect(() => {
    if (userInfo?.id) {
      fetchLatestJournalEntry(userInfo.id);
    }
  }, [userInfo]);

  // 获取用户花园ID
  useEffect(() => {
    if (userInfo?.id) {
      fetchUserGardenId(userInfo.id);
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

  // 根据日期获取日记条目
  const fetchJournalEntryByDate = async (date: string) => {
    try {
      if (!userInfo?.id) {
        console.log("没有用户ID，无法获取日记数据");
        return null;
      }

      // 解析传入的日期
      const selectedDate = new Date(date);
      
      // 创建当天开始时间（00:00:00）
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      // 创建当天结束时间（23:59:59）
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      console.log(`尝试获取日期范围 ${startOfDay.toISOString()} 至 ${endOfDay.toISOString()} 的日记`);
      
      // 查询指定日期的日记数据
      const { data, error } = await supabase
        .from('mental_health')
        .select('journal_entry, recorded_at')
        .eq('user_id', userInfo.id)
        .gte('recorded_at', startOfDay.toISOString())
        .lt('recorded_at', endOfDay.toISOString())
        .order('recorded_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("获取日记数据失败:", error);
        setJournalEntry(null);
        return null;
      }

      if (!data || !data.journal_entry) {
        console.log("未找到该日期的日记数据");
        setJournalEntry(null);
        return null;
      }

      console.log("获取到日记数据:", data);
      
      // 处理日记数据
      let content = null;
      try {
        const journalData: any = data.journal_entry;
        
        // 如果是字符串，尝试解析为 JSON
        if (typeof journalData === 'string') {
          try {
            const parsed = JSON.parse(journalData);
            content = parsed.content || null;
          } catch {
            content = journalData;
          }
        } 
        // 如果是对象或数组
        else if (typeof journalData === 'object' && journalData !== null) {
          if (Array.isArray(journalData) && journalData.length > 0) {
            content = journalData[0].content || null;
          } else {
            content = journalData.content || null;
          }
        } 
        // 其他情况
        else {
          content = String(journalData) || null;
        }
      } catch (error) {
        console.error("处理日记数据失败:", error);
        content = null;
      }
      
      setJournalEntry(content);
      return content;
    } catch (error) {
      console.error("获取日记错误:", error);
      setJournalEntry(null);
      return null;
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

  // 获取用户花园ID
  const fetchUserGardenId = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('gardens')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error("获取花园ID失败:", error);
        return;
      }

      if (data) {
        setGardenId(data.id);
      }
    } catch (error) {
      console.error("获取花园ID错误:", error);
    }
  };

  // 根据日期获取花园快照
  const fetchGardenSnapshot = async (date: string) => {
    try {
      if (!gardenId) {
        console.log("没有花园ID");
        return null;
      }

      setIsLoading(true);
      
      // 解析传入的日期并格式化为YYYY-MM-DD
      const selectedDate = new Date(date);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      console.log(`尝试获取日期 ${dateStr} 的花园快照，花园ID: ${gardenId}`);
      
      // 1. 先获取所有快照
      const { data, error } = await supabase
        .from('garden_snapshots')
        .select('*')
        .eq('garden_id', gardenId);

      if (error) {
        console.error("获取花园快照列表失败:", error);
        return null;
      }
      
      // 打印所有找到的记录，以便调试
      console.log(`找到 ${data?.length || 0} 条花园快照记录`);
      if (data && data.length > 0) {
        // 打印所有快照的摘要
        data.forEach((item, index) => {
          console.log(`快照 ${index + 1}:`, 
            `ID: ${item.id}`, 
            `花园ID: ${item.garden_id}`, 
            `快照日期: ${item.snapshot || 'null'}`
          );
        });
        
        // 2. 手动筛选与选定日期匹配的记录
        let matchedRecords: any[] = [];
        
        // 检查第一条记录的snapshot字段是否存在
        if (data[0] && data[0].snapshot) {
          // 尝试基于快照字段的字符串形式匹配
          if (typeof data[0].snapshot === 'string') {
            // 如果snapshot是字符串格式，检查是否包含目标日期
            matchedRecords = data.filter(item => {
              if (!item.snapshot) return false;
              
              // 检查snapshot字段是否包含目标日期字符串
              return (item.snapshot as string).includes(dateStr);
            });
            
            console.log(`基于字符串匹配找到 ${matchedRecords.length} 条记录`);
          } 
          // 尝试基于快照字段的日期形式匹配
          else {
            // 尝试将snapshot转换为日期并比较
            matchedRecords = data.filter(item => {
              if (!item.snapshot) return false;
              
              try {
                const snapshotDate = new Date(item.snapshot as string | number | Date);
                return (
                  snapshotDate.getFullYear() === selectedDate.getFullYear() &&
                  snapshotDate.getMonth() === selectedDate.getMonth() &&
                  snapshotDate.getDate() === selectedDate.getDate()
                );
              } catch (e) {
                return false;
              }
            });
            
            console.log(`基于日期匹配找到 ${matchedRecords.length} 条记录`);
          }
        }
        
        // 如果找到匹配的记录，使用第一条
        if (matchedRecords.length > 0) {
          console.log(`使用日期 ${dateStr} 的匹配记录: ID=${matchedRecords[0].id}`);
          return matchedRecords[0].snapshot_data;
        }
        
        // 如果没有找到精确匹配的记录，使用最近的一条记录进行测试
        console.log(`未找到日期 ${dateStr} 的记录，使用第一条记录进行测试`);
        return data[0].snapshot_data;
      }
      
      return null;
    } catch (error) {
      console.error("获取花园快照错误:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 根据日期获取物理健康数据
  const fetchPhysicalHealthData = async (date: string) => {
    try {
      if (!userInfo?.id) {
        console.log("没有用户ID，无法获取健康数据");
        return null;
      }

      // 解析传入的日期并格式化为YYYY-MM-DD
      const selectedDate = new Date(date);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      console.log(`尝试获取日期 ${dateStr} 的健康数据，用户ID: ${userInfo.id}`);
      
      // 创建当天开始时间（00:00:00）
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      // 创建当天结束时间（23:59:59）
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      // 查询指定日期的健康数据
      const { data, error } = await supabase
        .from('physical_health')
        .select('steps, calories, sleep_duration')
        .eq('user_id', userInfo.id)
        .gte('recorded_at', startOfDay.toISOString())
        .lt('recorded_at', endOfDay.toISOString())
        .order('recorded_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("获取健康数据失败:", error);
        setPhysicalHealth(null);
        return null;
      }

      if (!data) {
        console.log(`未找到日期 ${dateStr} 的健康数据`);
        const emptyData = { steps: null, calories: null, sleep_duration: null };
        setPhysicalHealth(emptyData);
        return emptyData;
      }

      console.log(`获取到健康数据:`, data);
      const healthData: PhysicalHealthData = {
        steps: data.steps,
        calories: data.calories,
        sleep_duration: data.sleep_duration
      };
      
      setPhysicalHealth(healthData);
      return healthData;
    } catch (error) {
      console.error("获取健康数据错误:", error);
      setPhysicalHealth(null);
      return null;
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
    journalEntry,
    gardenSnapshot,
    fetchGardenSnapshot,
    physicalHealth,
    fetchPhysicalHealthData,
    fetchJournalEntryByDate
  };
} 
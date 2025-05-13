import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import supabase from '../config/supabase';

// 根据情绪映射stress_level值
const moodToStressLevelMap = {
  'excited': 1,  // 兴奋
  'happy': 2,    // 愉悦
  'calm': 3,     // 平静
  'angry': 4,    // 愤怒
  'anxious': 5,  // 焦虑
  'sad': 6       // 难过
};

// 保存日记和情绪记录
export const saveJournalEntry = async (
  mood: 'excited' | 'happy' | 'calm' | 'angry' | 'anxious' | 'sad',
  content: string,
  tags: string[]
) => {
  try {
    // 从AsyncStorage获取用户ID
    const userDataString = await AsyncStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('用户未登录');
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.id;

    // 准备要保存的数据
    const journalData = {
      content: content,
      tags: tags,
      created_at: new Date().toISOString()
    };

    // 获取对应的stress_level值
    const stressLevel = moodToStressLevelMap[mood];
    
    // 插入数据到mental_health表
    const { error } = await supabase
      .from('mental_health')
      .insert([
        {
          user_id: userId,
          mood: mood,
          stress_level: stressLevel,
          journal_entry: journalData,
          recorded_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('保存日记失败:', error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('保存日记时出错:', error);
    Alert.alert("错误", "保存日记失败：" + error.message);
    return { success: false, error };
  }
};

// 获取用户的日记列表
export const getJournalEntries = async () => {
  try {
    // 从AsyncStorage获取用户ID
    const userDataString = await AsyncStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('用户未登录');
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.id;

    // 查询用户的日记列表，按时间倒序排列
    const { data, error } = await supabase
      .from('mental_health')
      .select('*')
      .eq('user_id', userId)
      .not('journal_entry', 'is', null)
      .order('recorded_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('获取日记列表失败:', error);
    Alert.alert("错误", "获取日记列表失败：" + error.message);
    return [];
  }
}; 
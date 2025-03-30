import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import { Database } from '../types/database';

// 确保环境变量存在
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// 创建一个安全的存储接口
const storage = {
  getItem: async (key: string) => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  },
};

let supabase;

try {
  // 创建 Supabase 客户端
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    db: {
      schema: 'public',
    },
  });

  // 测试 Supabase 客户端是否正常工作
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
  throw error;
}

// 添加重试逻辑
const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // 检查是否是网络错误
      if (error.message?.includes('Network request failed') || 
          error.message?.includes('Failed to fetch') ||
          error.message?.includes('NetworkError')) {
        console.log(`网络错误，等待重试... (${i + 1}/${maxRetries})`);
        if (i < maxRetries - 1) {
          const waitTime = delay * Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      }
      
      // 检查是否是速率限制错误
      if (error.message?.includes('Too Many Requests') || 
          error.message?.includes('For security purposes')) {
        const waitTimeMatch = error.message.match(/(\d+) seconds/);
        const waitTime = waitTimeMatch ? parseInt(waitTimeMatch[1]) * 1000 : delay;
        
        console.log(`Rate limit hit, waiting ${waitTime/1000} seconds before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      // 对于其他错误，使用指数退避
      if (i < maxRetries - 1) {
        const waitTime = delay * Math.pow(2, i);
        console.log(`Retrying in ${waitTime/1000} seconds... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
    }
  }
  
  throw lastError;
};

// 导出带重试功能的 Supabase 客户端
const supabaseWithRetry = {
  ...supabase,
  auth: {
    ...supabase.auth,
    signUp: async (...args: Parameters<typeof supabase.auth.signUp>) => {
      return withRetry(() => supabase.auth.signUp(...args));
    },
    signInWithPassword: async (...args: Parameters<typeof supabase.auth.signInWithPassword>) => {
      return withRetry(() => supabase.auth.signInWithPassword(...args));
    },
    signOut: async (...args: Parameters<typeof supabase.auth.signOut>) => {
      return withRetry(() => supabase.auth.signOut(...args));
    },
    onAuthStateChange: (callback: (event: AuthChangeEvent, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback);
    },
    getUser: async () => {
      return withRetry(() => supabase.auth.getUser());
    },
    getSession: async () => {
      return withRetry(() => supabase.auth.getSession());
    },
  },
  from: <T extends keyof Database['public']['Tables']>(table: T) => {
    return supabase.from(table);
  },
};

export default supabaseWithRetry; 
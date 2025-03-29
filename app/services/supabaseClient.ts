import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';

// 从环境变量中获取Supabase URL和匿名密钥
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// 确保 supabaseUrl 和 supabaseKey 是字符串
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL 或 Key 未定义');
}

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: isBrowser ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 
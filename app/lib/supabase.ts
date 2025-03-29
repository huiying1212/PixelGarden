import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AuthChangeEvent } from '@supabase/supabase-js';

// 数据库类型定义
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string;
          name: string;
          email: string;
          password: string;
          age: number | null;
          gender: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          email: string;
          password: string;
          age?: number | null;
          gender?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          name?: string;
          email?: string;
          password?: string;
          age?: number | null;
          gender?: string | null;
          created_at?: string;
        };
      };
      physical_health: {
        Row: {
          record_id: number;
          user_id: string;
          weight: number | null;
          height: number | null;
          heart_rate: number | null;
          blood_pressure: string | null;
          sleep_duration: number | null;
          steps: number | null;
          recorded_at: string;
        };
        Insert: {
          user_id: string;
          weight?: number | null;
          height?: number | null;
          heart_rate?: number | null;
          blood_pressure?: string | null;
          sleep_duration?: number | null;
          steps?: number | null;
          recorded_at?: string;
        };
        Update: {
          user_id?: string;
          weight?: number | null;
          height?: number | null;
          heart_rate?: number | null;
          blood_pressure?: string | null;
          sleep_duration?: number | null;
          steps?: number | null;
          recorded_at?: string;
        };
      };
      mental_health: {
        Row: {
          record_id: number;
          user_id: string;
          mood: string | null;
          stress_level: number | null;
          journal_entry: any;
          meditation_time: number | null;
          recorded_at: string;
        };
        Insert: {
          user_id: string;
          mood?: string | null;
          stress_level?: number | null;
          journal_entry?: any;
          meditation_time?: number | null;
          recorded_at?: string;
        };
        Update: {
          user_id?: string;
          mood?: string | null;
          stress_level?: number | null;
          journal_entry?: any;
          meditation_time?: number | null;
          recorded_at?: string;
        };
      };
      app_usage: {
        Row: {
          usage_id: number;
          user_id: string;
          duration: number;
          timestamp: string;
        };
        Insert: {
          user_id: string;
          duration: number;
          timestamp?: string;
        };
        Update: {
          user_id?: string;
          duration?: number;
          timestamp?: string;
        };
      };
    };
  };
};

const supabaseUrl = 'https://sbariliazqwlgxlbtidd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiYXJpbGlhenF3bGd4bGJ0aWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDU5NDMsImV4cCI6MjA1ODcyMTk0M30.dZHKeSwfHrG8zsg8SZAGGGVOWOjZ4rVl8WkbNlXynEo';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    onAuthStateChange: (event) => {
      console.log('Supabase auth event:', event);
    },
    // 配置重定向URL
    redirectTo: 'pixelgarden://auth/callback',
  },
}); 
import supabase from './supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 用户注册类型
type SignUpData = {
  email: string;
  password: string;
  name: string;
  gender?: string;
};

// 用户登录类型
type SignInData = {
  email: string;
  password: string;
};

class AuthService {
  // 检查用户是否已认证
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.getSession();
      return !!data?.session;
    } catch (error) {
      console.error('检查认证状态出错:', error);
      return false;
    }
  }

  // 用户注册
  async signUp({ email, password, name, gender }: SignUpData) {
    try {
      // 首先创建用户认证
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // 然后在users表中添加用户信息
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              user_id: authData.user.id,
              name,
              gender: gender || null,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
        
        return { success: true, user: authData.user };
      }
    } catch (error) {
      console.error('注册失败:', error);
      return { success: false, error };
    }
  }

  // 用户登录
  async signIn({ email, password }: SignInData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return { success: true, session: data.session, user: data.user };
    } catch (error) {
      console.error('登录失败:', error);
      return { success: false, error };
    }
  }

  // 用户退出登录
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('退出登录失败:', error);
      return { success: false, error };
    }
  }

  // 获取当前登录用户
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      if (data?.user) {
        // 获取用户详细信息
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
          
        if (userError) throw userError;
        
        return { success: true, user: { ...data.user, profile: userData } };
      }
      
      return { success: false, error: 'No user found' };
    } catch (error) {
      console.error('获取当前用户失败:', error);
      return { success: false, error };
    }
  }
}

export default new AuthService(); 
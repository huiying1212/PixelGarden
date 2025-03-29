import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import supabase from './lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export default function LogoutScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. 先清除本地存储
      await AsyncStorage.removeItem('userInfo');
      
      // 2. 执行 Supabase 退出
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // 3. 直接跳转，不显示提示
      if (Platform.OS === 'web') {
        window.location.href = '/login';
      } else {
        router.replace('/login');
      }
    } catch (error: any) {
      console.error('退出登录失败:', error.message);
      if (Platform.OS === 'web') {
        window.alert('退出登录失败，请重试');
      } else {
        Alert.alert('错误', '退出登录失败，请重试');
      }
    }
  };

  // 网页版显示按钮，移动端直接执行退出
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 移动端直接执行退出
  handleLogout();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>正在退出登录...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  text: {
    fontSize: 16,
    color: '#666'
  },
  button: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
}); 
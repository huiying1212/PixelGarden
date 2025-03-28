import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import authService from '../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('错误', '请填写所有字段');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.signIn({ email, password });
      
      if (result.success) {
        router.replace('/');
      } else {
        Alert.alert('登录失败', '邮箱或密码错误');
      }
    } catch (error) {
      console.error('登录出错:', error);
      Alert.alert('错误', '登录过程中发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '登录',
        }}
      />
      
      <Text style={styles.title}>欢迎回来</Text>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>邮箱</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="输入您的邮箱"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="输入您的密码"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>登录</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>还没有账号？</Text>
          <TouchableOpacity onPress={() => router.push('/screens/RegisterScreen')}>
            <Text style={styles.linkText}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  linkText: {
    color: '#007AFF',
    marginLeft: 5,
    fontWeight: '600',
  },
}); 
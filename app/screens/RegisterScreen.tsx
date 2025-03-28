import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import authService from '../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 基本验证
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('错误', '请填写所有必填字段');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      Alert.alert('错误', '密码长度至少为6个字符');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.signUp({ 
        email, 
        password, 
        name,
        gender
      });
      
      if (result && result.success) {
        Alert.alert('注册成功', '请登录您的账号', [
          { text: '确定', onPress: () => router.push('/screens/LoginScreen') }
        ]);
      } else {
        // 确保result存在并且有error属性
        const errorMessage = result?.error ? 
          (typeof result.error === 'object' && 'message' in result.error ? 
            String(result.error.message) : '请稍后再试') : 
          '请稍后再试';
        Alert.alert('注册失败', errorMessage);
      }
    } catch (error) {
      console.error('注册出错:', error);
      Alert.alert('错误', '注册过程中发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: '注册账号',
        }}
      />
      
      <Text style={styles.title}>创建您的账号</Text>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>姓名 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="输入您的姓名"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>邮箱 <Text style={styles.required}>*</Text></Text>
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
          <Text style={styles.label}>性别</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="输入您的性别（可选）"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>密码 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="设置密码（至少6个字符）"
            secureTextEntry
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>确认密码 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="再次输入密码"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>注册</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>已有账号？</Text>
          <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
            <Text style={styles.linkText}>立即登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: 30,
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
  required: {
    color: 'red',
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
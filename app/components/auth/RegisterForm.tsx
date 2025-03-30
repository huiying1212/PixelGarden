import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useRouter } from "expo-router";

interface RegisterFormProps {
  email: string;
  setEmail: (text: string) => void;
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  confirmPassword: string;
  setConfirmPassword: (text: string) => void;
  age: string;
  setAge: (text: string) => void;
  gender: string;
  setGender: (text: string) => void;
  isLoading: boolean;
  errors: {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  errorMessages: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  validateEmail: (text: string) => Promise<boolean>;
  validateUsername: (text: string) => boolean;
  validatePassword: (text: string) => boolean;
  validateConfirmPassword: (text: string) => boolean;
  onRegister: () => Promise<void>;
}

export default function RegisterForm({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  age,
  setAge,
  gender,
  setGender,
  isLoading,
  errors,
  errorMessages,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  onRegister,
}: RegisterFormProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          disabled={isLoading}
        >
          <Image source={require("../../../assets/images/image.png")} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>注册新账号</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="邮箱"
          style={[styles.input, errors.email && styles.errorInput]}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        {errors.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="用户名"
          style={[styles.input, errors.username && styles.errorInput]}
          onChangeText={(text) => {
            setUsername(text);
            validateUsername(text);
          }}
          value={username}
          editable={!isLoading}
        />
        {errors.username && <Text style={styles.errorText}>{errorMessages.username}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="密码"
          style={[styles.input, errors.password && styles.errorInput]}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
            if (confirmPassword) validateConfirmPassword(confirmPassword);
          }}
          value={password}
          editable={!isLoading}
        />
        {errors.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="确认密码"
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          secureTextEntry
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateConfirmPassword(text);
          }}
          value={confirmPassword}
          editable={!isLoading}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="年龄（可选）"
          style={[styles.input, styles.optionalInput]}
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="性别（可选）"
          style={[styles.input, styles.optionalInput]}
          onChangeText={setGender}
          value={gender}
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.registerButton, isLoading && styles.disabledButton]} 
        onPress={onRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>注册</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>已有账号？</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === 'web' ? 20 : 50
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10
  },
  backIcon: {
    width: 24,
    height: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: Platform.OS === 'web' ? 10 : 30
  },
  inputContainer: {
    width: Platform.OS === 'web' ? 300 : 250,
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  errorInput: {
    borderColor: "#ff0000",
    borderWidth: 1
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 2
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: Platform.OS === 'web' ? 300 : 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  disabledButton: {
    backgroundColor: "#cccccc"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  optionalInput: {
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd'
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  loginText: {
    color: "#666",
    fontSize: 16
  },
  loginLink: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5
  }
}); 
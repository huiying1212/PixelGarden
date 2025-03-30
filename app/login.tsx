import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import LoginForm from './components/auth/LoginForm';
import { useAuth } from './hooks/useAuth';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, isLoading, login } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        onLogin={login}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

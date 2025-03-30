import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import RegisterForm from './components/auth/RegisterForm';
import { useRegister } from './hooks/useRegister';

export default function RegisterScreen() {
  const {
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
    validatePassword,
    validateConfirmPassword,
    validateUsername,
    register
  } = useRegister();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <RegisterForm
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        isLoading={isLoading}
        errors={errors}
        errorMessages={errorMessages}
        validateEmail={validateEmail}
        validateUsername={validateUsername}
        validatePassword={validatePassword}
        validateConfirmPassword={validateConfirmPassword}
        onRegister={register}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
}); 
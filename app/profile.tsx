import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ProfileForm from './components/profile/ProfileForm';
import { useProfile } from './hooks/useProfile';

export default function ProfileScreen() {
  const { userInfo, isLoading, confirmLogout } = useProfile();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ProfileForm
        userInfo={userInfo}
        isLoading={isLoading}
        onLogout={confirmLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6E9',
  },
});

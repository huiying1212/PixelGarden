import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { UserInfo } from "../../hooks/useProfile";

interface ProfileFormProps {
  userInfo: UserInfo | null;
  isLoading: boolean;
  onLogout: () => void;
}

export default function ProfileForm({ userInfo, isLoading, onLogout }: ProfileFormProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 头部栏 */}
      <View style={styles.header}>
        {/* 返回按钮 */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={require("../../../assets/images/image.png")} style={styles.backIcon} />
        </TouchableOpacity>
        {/* 标题 */}
        <Text style={styles.title}>个人信息</Text>
      </View>

      {/* 加载指示器 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <>
          {/* 用户信息显示部分 */}
          <View style={styles.profileSection}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>名字</Text>
              <Text style={styles.value}>{userInfo?.name || "未设置"}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.label}>邮箱</Text>
              <Text style={styles.value}>{userInfo?.email || "未设置"}</Text>
            </View>
          </View>

          {/* 退出登录按钮 */}
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={onLogout}
            disabled={isLoading}
          >
            <Text style={styles.logoutText}>退出登录</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#EAF6E9" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#EAF6E9",
  },
  backButton: { 
    padding: 10 
  },
  backIcon: { 
    width: 24, 
    height: 24 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    flex: 1, 
    textAlign: "center" 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 
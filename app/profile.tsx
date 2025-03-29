import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "./lib/supabase";

interface UserInfo {
  name: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userInfoStr = await AsyncStorage.getItem("userInfo");
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "退出登录",
      "确定要退出登录吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "确定",
          style: "destructive",
          onPress: async () => {
            try {
              // 清除本地存储的用户信息
              await AsyncStorage.multiRemove(["userInfo", "session"]);
              // 退出 Supabase 会话
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
              
              // 清除用户状态
              setUserInfo(null);
              
              // 使用 replace 而不是 push，防止用户通过返回按钮回到需要登录的页面
              router.replace("/login");
            } catch (error) {
              console.error("退出登录失败:", error);
              Alert.alert("错误", "退出登录失败，请重试");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 头部栏 */}
      <View style={styles.header}>
        {/* 返回按钮 */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={require("../assets/images/image.png")} style={styles.backIcon} />
        </TouchableOpacity>
        {/* 标题 */}
        <Text style={styles.title}>个人信息</Text>
      </View>

      {/* 用户信息显示部分 */}
      <View style={styles.profileSection}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>名字</Text>
          <Text style={styles.value}>{userInfo?.name || "未登录"}</Text>
        </View>
      </View>

      {/* 退出登录按钮 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
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

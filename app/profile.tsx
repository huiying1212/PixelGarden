import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
});

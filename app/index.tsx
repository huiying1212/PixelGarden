import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // 引入路由

export default function HomeScreen() {
  const router = useRouter(); // 初始化路由

  return (
    <View style={styles.container}>
      {/* 头像按钮 */}
      <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/profile")}>
        <Image source={require("../assets/images/profile_icon.png")} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
  profileButton: { position: "absolute", top: 40, left: 20 },
  profileIcon: { width: 50, height: 50, borderRadius: 25 },
});
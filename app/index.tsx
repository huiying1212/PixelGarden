import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import authService from "./services/authService";

// 定义用户类型
type UserProfile = {
  name?: string;
  gender?: string;
  user_id?: string;
  created_at?: string;
};

type User = {
  id: string;
  email?: string;
  profile?: UserProfile;
  [key: string]: any; // 允许其他属性
};

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user as User);
      }
    } catch (error) {
      console.error("获取用户信息失败", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Garden</Text>
        {!loading && (
          user ? (
            <TouchableOpacity onPress={handleLogout} style={styles.accountBtn}>
              <Text style={styles.accountBtnText}>退出登录</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={() => router.push("/screens/LoginScreen")} 
              style={styles.accountBtn}
            >
              <Text style={styles.accountBtnText}>登录/注册</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={styles.content}>
        {user ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>欢迎回来，{user.profile?.name || '用户'}</Text>
            {/* 这里可以显示用户仪表板或其他内容 */}
          </View>
        ) : (
          <View style={styles.authContainer}>
            <Text style={styles.authText}>欢迎来到AI Garden</Text>
            <Text style={styles.authSubText}>您的健康伴侣</Text>
            
            <View style={styles.authButtons}>
              <TouchableOpacity
                onPress={() => router.push("/screens/LoginScreen")}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>登录</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push("/screens/RegisterScreen")}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>注册</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  accountBtn: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e8f0fe",
  },
  accountBtnText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  welcomeContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  authContainer: {
    alignItems: "center",
    padding: 20,
  },
  authText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  authSubText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import authService from "./services/authService";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 检查用户是否已登录
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error('认证状态检查失败:', error);
      setIsAuthenticated(false);
    }
  };

  // 显示加载状态
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="screens/LoginScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="screens/RegisterScreen"
            options={{
              title: '注册',
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack>
  );
}

// app/_layout.tsx
import { useRouter, Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import supabase from "./config/supabase";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: any) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inLoginPage = segments[0] === "login";
    const inRegisterPage = segments[0] === "register";

    if (!isLoggedIn && !inLoginPage && !inRegisterPage) {
      // 如果未登录且不在登录或注册页面，重定向到登录页
      router.replace("/login");
    } else if (isLoggedIn && (inLoginPage || inRegisterPage)) {
      // 如果已登录但在登录或注册页面，重定向到主页
      router.replace("/");
    }
  }, [isLoggedIn, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack />;
}

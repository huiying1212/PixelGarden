// app/_layout.tsx
import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const isLoggedIn = false; // 替换为实际的登录状态检查

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login"); // 重定向到登录页
    }
  }, [isLoggedIn]);

  return <Stack />;
}
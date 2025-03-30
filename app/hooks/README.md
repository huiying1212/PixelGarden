# 钩子目录 (Hooks)

本目录包含应用程序的自定义React钩子(Custom Hooks)，用于分离和复用逻辑代码。

## 目录结构

- **useAuth.ts** - 认证相关的钩子，处理登录、注册和会话管理逻辑
<!-- - **useProfile.ts** - 用户资料相关的钩子
- **useHealthData.ts** - 健康数据相关的钩子
- **useAppSettings.ts** - 应用设置相关的钩子 -->

## 使用方式

钩子应当专注于处理组件逻辑和状态管理，将UI与逻辑分离。它们应该:

1. 封装常用的状态逻辑
2. 处理副作用（如API调用、订阅等）
3. 提供可复用的功能
4. 使组件代码更简洁和易于维护

## 示例

```typescript
// 在组件中使用认证钩子
import { useAuth } from '../hooks/useAuth';

function LoginScreen() {
  const { email, setEmail, password, setPassword, isLoading, login } = useAuth();
  
  // 使用这些状态和函数构建UI
  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
      onLogin={login}
    />
  );
}
``` 
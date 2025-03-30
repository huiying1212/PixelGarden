# 组件目录 (Components)

本目录包含应用程序的React组件，用于构建用户界面。

## 目录结构

- **auth/** - 认证相关的组件，如登录表单、注册表单等
  - **LoginForm.tsx** - 登录表单组件
  - **RegisterForm.tsx** - 注册表单组件
- **profile/** - 用户资料相关的组件
  - **ProfileForm.tsx** - 用户资料表单组件

## 使用方式

组件应当专注于UI渲染，将业务逻辑委托给钩子和服务。它们应该:

1. 接受明确的props
2. 实现适当的分离关注点
3. 保持可复用性
4. 提供良好的用户体验

## 示例

```typescript
// 导入并使用登录表单组件
import LoginForm from '../components/auth/LoginForm';

function LoginScreen() {
  // 获取所需的状态和处理函数
  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
      onLogin={handleLogin}
    />
  );
}
``` 
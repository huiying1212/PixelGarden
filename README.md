# AIGarden 🌱

一个基于React Native + Expo开发的健康管理与虚拟花园应用，通过游戏化的方式帮助用户记录和管理身心健康。

## 项目特色 ✨

- **虚拟花园**：3D WebGL花园场景，植物生长状态反映用户健康状况
- **健康记录**：支持身体健康和心理健康数据的记录与追踪
- **情绪日记**：多样化心情选择，支持标签分类和文字记录
- **用户系统**：完整的注册登录体系，支持邮箱验证
- **数据可视化**：健康数据的趣味性展示
- **跨平台支持**：iOS、Android、Web三端适配

## 技术栈 🛠️

### 前端框架
- **React Native** - 跨平台移动应用开发
- **Expo** - React Native开发工具链
- **TypeScript** - 类型安全的JavaScript
- **Expo Router** - 基于文件的路由系统

### 后端服务
- **Supabase** - 开源的Firebase替代方案
  - 用户认证和授权
  - PostgreSQL数据库
  - 实时数据同步
  - 文件存储

### 核心依赖
- `@react-navigation/native` - 导航组件
- `react-native-reanimated` - 高性能动画库
- `expo-image-picker` - 图片选择功能
- `expo-gl` - WebGL支持
- `@react-native-async-storage/async-storage` - 本地存储

## 快速开始 🚀

### 环境要求
- Node.js >= 18
- npm 或 yarn
- Expo CLI

### 安装步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   
   创建 `.env` 文件并配置Supabase连接：
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   ```

3. **启动项目**
   ```bash
   npm start
   ```

4. **运行应用**
   - **iOS模拟器**: 按 `i`
   - **Android模拟器**: 按 `a`
   - **Web浏览器**: 按 `w`
   - **Expo Go**: 扫描二维码

## 项目结构 📁

```
app/
├── components/          # 可复用组件
│   ├── auth/           # 认证相关组件
│   ├── home/           # 主页组件
│   ├── profile/        # 个人资料组件
│   ├── record/         # 记录相关组件
│   └── common/         # 通用组件
├── hooks/              # 自定义React Hooks
├── services/           # API服务层
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
├── config/             # 配置文件
├── assets/             # 静态资源
├── (auth)/             # 认证相关页面
│   ├── login.tsx
│   └── register.tsx
├── index.tsx           # 主页
├── profile.tsx         # 个人资料页
├── record.tsx          # 记录页面
└── _layout.tsx         # 根布局
```

## 主要功能 🎯

### 用户系统
- [x] 邮箱注册/登录
- [x] 邮箱验证
- [x] 用户资料管理
- [x] 自动登录状态保持

### 健康记录
- [x] 心情记录（6种情绪状态）
- [x] 日记撰写
- [x] 标签分类
- [x] 身体健康数据记录
- [x] 数据历史查看

### 虚拟花园
- [x] 3D WebGL场景渲染
- [x] 植物生长动画
- [x] 花园快照保存
- [x] 装饰物系统

## 开发指南 🔧

### 数据库结构
项目使用Supabase PostgreSQL，主要数据表包括：
- `users` - 用户基本信息
- `mental_health` - 心理健康记录
- `physical_health` - 身体健康记录
- `gardens` - 花园数据
- `garden_snapshots` - 花园快照
- `app_usage` - 应用使用统计

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 组件使用函数式组件 + Hooks
- 自定义Hooks处理业务逻辑
- Service层处理API调用

## 部署说明 📦

### 构建生产版本
```bash
# 构建优化版本
expo build

# 或使用EAS Build
eas build --platform all
```

### 环境配置
- 开发环境：使用Expo Go
- 生产环境：构建独立应用包


**AIGarden** - 让健康管理变得有趣 🌸

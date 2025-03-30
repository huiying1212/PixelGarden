# 服务目录 (Services)

本目录包含应用程序的服务层，负责处理业务逻辑和数据交互。

## 目录结构

- **auth.service.ts** - 认证相关的服务，如登录、注册、验证邮箱等
<!-- - **user.service.ts** - 用户相关的服务，如用户资料的获取和更新
- **health.service.ts** - 健康数据相关的服务
- **app.service.ts** - 应用程序相关的服务，如设置、使用统计等 -->

## 使用方式

服务应当专注于业务逻辑，不包含UI相关的代码。它们应该:

1. 封装与后端API的交互
2. 提供数据验证和处理
3. 处理业务规则和逻辑
4. 提供数据转换和格式化

## 示例

```typescript
// 使用身体健康服务获取健康数据
import { getPhysicalHealthData } from '../services/health.service';

// 在组件中使用
const healthData = await getPhysicalHealthData(userId);
``` 
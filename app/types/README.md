# 类型目录 (Types)

本目录包含应用程序的TypeScript类型定义，用于提供类型安全和代码自文档化。

## 目录结构

- **database.ts** - Supabase数据库相关的类型定义（自动生成）
<!-- 
- **auth.types.ts** - 认证相关的类型定义
- **user.types.ts** - 用户数据相关的类型定义
- **health.types.ts** - 健康数据相关的类型定义
- **api.types.ts** - API响应和请求相关的类型定义 -->

## 自动生成数据库类型

`database.ts` 文件是使用 Supabase CLI 自动从数据库生成的：

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > app/types/database.ts
```
YOUR_PROJECT_ID在Project Settings中获取。

当数据库结构发生变化时，应该重新运行上述命令以更新类型定义。

如果报错，检查文件编码，确保 database.ts 文件是以 UTF-8 编码保存的。

## 使用方式

类型定义应当清晰、准确地描述数据结构。它们应该:

1. 提供完整的类型信息
2. 使用接口继承和组合提高复用性
3. 与实际数据模型保持同步
4. 文档化关键属性

## 示例

```typescript
// 导入并使用数据库类型
import { Database } from '../types/database';

// 使用类型
function getUserProfile(userId: string): Promise<Database['public']['Tables']['users']['Row']> {
  // 实现获取用户资料的逻辑
}

// 使用辅助类型
import { Tables } from '../types/database';

type User = Tables<'users'>;
``` 
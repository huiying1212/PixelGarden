# 类型定义目录 (Types) 📝

本目录包含GrowYou应用程序的TypeScript类型定义，用于提供类型安全、代码自文档化和更好的开发体验。

## 自动生成数据库类型 🔄

### 生成命令
`database.ts` 文件是使用 Supabase CLI 自动从数据库生成的：

```bash
# 安装 Supabase CLI (如果还没安装)
npm install -g supabase

# 登录 Supabase
supabase login

# 生成类型定义
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > app/types/database.ts
```

YOUR_PROJECT_ID在Project Settings中获取。

当数据库结构发生变化时，应该重新运行上述命令以更新类型定义。

如果报错，检查文件编码，确保 database.ts 文件是以 UTF-8 编码保存的。

## 示例

```typescript
// 导入并使用数据库类型
import { Database } from '../types/database';

// 使用类型
function getUserProfile(userId: string): Promise<Database['public']['Tables']['users']['Row']> {
  // 实现获取用户资料的逻辑
}

// 使用辅助类型
type Tables = Database['public']['Tables'];
type User = Tables['users']['Row'];
``` 
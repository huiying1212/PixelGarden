# 服务目录 (Services)

本目录包含应用程序的服务层，负责处理业务逻辑和数据交互。

## 目录结构

- **auth.service.ts** - 认证相关的服务，提供以下功能：
  - 用户登录（signInWithEmail）
  - 处理未验证邮箱（handleUnverifiedEmail）
  - 检查和创建用户资料（checkAndCreateUserProfile）
  - 创建初始健康记录（createInitialRecords）
  - 处理成功登录（handleSuccessfulLogin）

- **journal.service.ts** - 日记和情绪记录相关的服务，提供以下功能：
  - 保存日记和情绪记录（saveJournalEntry）
  - 获取用户历史日记列表（getJournalEntries）
  - 情绪映射到数据库stress_level值（1-兴奋，2-愉悦，3-平静，4-愤怒，5-焦虑，6-难过）

## 使用方式

服务应当专注于业务逻辑，不包含UI相关的代码。它们应该:

1. 封装与后端API的交互
2. 提供数据验证和处理
3. 处理业务规则和逻辑
4. 提供数据转换和格式化

## 示例

```typescript
// 使用认证服务进行登录
import { signInWithEmail } from '../services/auth.service';

// 在钩子或组件中使用
const { session } = await signInWithEmail(email, password);

// 使用日记服务保存记录
import { saveJournalEntry } from '../services/journal.service';

// 保存用户的日记和情绪
const { success } = await saveJournalEntry('happy', '今天过得很开心!', ['愉快', '放松']);
``` 
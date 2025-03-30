-- 删除现有表（如果存在）
DROP TABLE IF EXISTS users CASCADE;

-- 重新创建用户表，不使用外键约束
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 创建 RLS 策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 允许已认证用户读取所有用户信息
CREATE POLICY "允许已认证用户读取" ON users
    FOR SELECT
    TO authenticated
    USING (true);

-- 允许用户创建自己的档案
CREATE POLICY "允许用户创建自己的档案" ON users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- 允许用户更新自己的档案
CREATE POLICY "允许用户更新自己的档案" ON users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 创建触发器函数，确保 user_id 存在于 auth.users 表中
CREATE OR REPLACE FUNCTION check_auth_user() RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = NEW.user_id) THEN
    RAISE EXCEPTION 'User ID does not exist in auth.users';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS ensure_auth_user_exists ON users;
CREATE TRIGGER ensure_auth_user_exists
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION check_auth_user(); 
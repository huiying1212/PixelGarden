import { useState } from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import supabase from "../config/supabase";
import { showAlert } from "../utils/alertUtils";

export function useRegister() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const validateEmail = async (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱不能为空" }));
      setErrors(prev => ({ ...prev, email: true }));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱格式错误" }));
      setErrors(prev => ({ ...prev, email: true }));
      return false;
    }

    setErrorMessages(prev => ({ ...prev, email: "" }));
    setErrors(prev => ({ ...prev, email: false }));
    return true;
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, password: "密码不能为空" }));
      setErrors(prev => ({ ...prev, password: true }));
      return false;
    }
    if (text.length < 6) {
      setErrorMessages(prev => ({ ...prev, password: "密码长度不足" }));
      setErrors(prev => ({ ...prev, password: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, password: "" }));
    setErrors(prev => ({ ...prev, password: false }));
    return true;
  };

  const validateConfirmPassword = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, confirmPassword: "请确认密码" }));
      setErrors(prev => ({ ...prev, confirmPassword: true }));
      return false;
    }
    if (text !== password) {
      setErrorMessages(prev => ({ ...prev, confirmPassword: "两次输入的密码不一致" }));
      setErrors(prev => ({ ...prev, confirmPassword: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, confirmPassword: "" }));
    setErrors(prev => ({ ...prev, confirmPassword: false }));
    return true;
  };

  const validateUsername = (text: string) => {
    if (!text) {
      setErrorMessages(prev => ({ ...prev, username: "用户名不能为空" }));
      setErrors(prev => ({ ...prev, username: true }));
      return false;
    }
    setErrorMessages(prev => ({ ...prev, username: "" }));
    setErrors(prev => ({ ...prev, username: false }));
    return true;
  };

  const validateInputs = async () => {
    const emailValid = await validateEmail(email);
    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validateConfirmPassword(confirmPassword);
    const usernameValid = validateUsername(username);

    return emailValid && passwordValid && confirmPasswordValid && usernameValid;
  };

  const handleAuthError = (error: any) => {
    // 防止重复处理
    if (isLoading) return;

    if (error.message?.includes('User already registered')) {
      showAlert(
        "邮箱已注册",
        "该邮箱已被注册。\n\n" +
        "请直接登录或使用其他邮箱注册。",
        [
          { 
            text: "去登录", 
            onPress: () => {
              setIsLoading(false);
              router.push("/login");
            }
          },
          { 
            text: "使用其他邮箱", 
            onPress: () => {
              setIsLoading(false);
              setEmail("");
              setErrorMessages(prev => ({ ...prev, email: "" }));
              setErrors(prev => ({ ...prev, email: false }));
            }
          }
        ]
      );
    } else if (error.message?.includes('Network request failed') || 
               error.message?.includes('Failed to fetch') ||
               error.message?.includes('NetworkError')) {
      showAlert(
        "网络错误",
        "无法连接到服务器，请检查网络连接。\n\n" +
        "如果问题持续存在，请稍后重试。"
      );
    } else if (error.message?.includes('Too Many Requests') || 
               error.message?.includes('For security purposes')) {
      const waitTimeMatch = error.message.match(/(\d+) seconds/);
      const waitTime = waitTimeMatch ? parseInt(waitTimeMatch[1]) : 60;
      
      showAlert(
        "请求过于频繁",
        `请等待 ${waitTime} 秒后再试。\n\n` +
        "这是为了保护您的账号安全。"
      );
    } else if (error.message?.includes('Invalid email')) {
      setErrorMessages(prev => ({ ...prev, email: "邮箱格式错误" }));
      setErrors(prev => ({ ...prev, email: true }));
    } else if (error.message?.includes('Password should be at least')) {
      setErrorMessages(prev => ({ ...prev, password: "密码长度不足" }));
      setErrors(prev => ({ ...prev, password: true }));
    } else {
      showAlert("注册失败", error.message || "请稍后重试");
    }
  };

  const register = async () => {
    if (!(await validateInputs())) return;
    
    // 防止重复提交
    if (isLoading || isSubmitting) return;

    try {
      setIsLoading(true);
      setIsSubmitting(true);

      // 1. 尝试注册用户
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      // 处理注册错误
      if (signUpError) {
        console.error('注册错误:', signUpError.message);
        handleAuthError(signUpError);
        return;
      }

      if (!user) {
        showAlert("注册失败", "创建用户失败，请重试");
        return;
      }

      // 2. 创建用户资料
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            user_id: user.id,
            name: username,
            age: age ? parseInt(age) : null,
            gender: gender || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (profileError) {
        console.error('创建用户资料失败:', profileError);
        // 如果创建资料失败，删除已创建的用户
        await supabase.auth.signOut();
        showAlert(
          "注册失败",
          "创建用户资料失败，请重试。\n错误信息：" + profileError.message
        );
        return;
      }

      // 3. 注册成功，显示提示并跳转
      showAlert(
        "注册成功",
        "请查看邮箱并点击验证链接。\n验证后即可登录。",
        [
          {
            text: "确定",
            onPress: () => router.replace("/login")
          }
        ]
      );
    } catch (error: any) {
      console.error('注册过程发生错误:', error);
      showAlert("错误", "注册过程发生错误，请重试");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    age,
    setAge,
    gender,
    setGender,
    isLoading,
    errors,
    errorMessages,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateUsername,
    register
  };
} 
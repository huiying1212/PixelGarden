import React from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { useAuth } from './hooks/useAuth';
import { useRouter } from "expo-router";
import AuthLayout from './components/common/AuthLayout';
import InputField from './components/common/InputField';
import ActionButton from './components/common/ActionButton';
import LinkPrompt from './components/common/LinkPrompt';
import { SHARED_CONSTANTS } from './components/common/constants';

// 类型定义
interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

// 常量定义
const LOGIN_STRINGS = {
  WELCOME_BACK: '欢迎回来！',
  LOGIN_TITLE: '登录您的账号',
  EMAIL_PLACEHOLDER: '账号',
  PASSWORD_PLACEHOLDER: '密码',
  CONFIRM_BUTTON: '确认',
  NO_ACCOUNT: '还没有账号？',
  REGISTER: '注册'
} as const;

const { width } = Dimensions.get('window');

// 子组件：登录表单
const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onLogin,
  onNavigateToRegister
}) => (
  <View style={styles.formContent}>
    <ImageBackground 
      source={SHARED_CONSTANTS.IMAGES.DECORATION} 
      style={styles.titleDecoration}
      resizeMode="contain"
    />
    <Text style={styles.loginTitle}>{LOGIN_STRINGS.LOGIN_TITLE}</Text>
    
    <View style={styles.inputSection}>
      <InputField
        icon={SHARED_CONSTANTS.IMAGES.USER_ICON}
        placeholder={LOGIN_STRINGS.EMAIL_PLACEHOLDER}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        isLoading={isLoading}
        containerStyle={styles.inputSpacing}
      />
      
      <InputField
        icon={SHARED_CONSTANTS.IMAGES.PASSWORD_ICON}
        placeholder={LOGIN_STRINGS.PASSWORD_PLACEHOLDER}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        isLoading={isLoading}
        containerStyle={styles.inputSpacing}
      />
    </View>
    
    <ActionButton
      title={LOGIN_STRINGS.CONFIRM_BUTTON}
      onPress={onLogin}
      isLoading={isLoading}
    />
    
    <LinkPrompt
      promptText={LOGIN_STRINGS.NO_ACCOUNT}
      linkText={LOGIN_STRINGS.REGISTER}
      onLinkPress={onNavigateToRegister}
    />
    
    <View style={styles.decorationContainer}>
      <View style={styles.decorationImage} />
    </View>
  </View>
);

// 主组件
export default function LoginScreen(): JSX.Element {
  const { email, setEmail, password, setPassword, isLoading, login } = useAuth();
  const router = useRouter();
  
  const handleNavigateToRegister = (): void => {
    router.push("/register");
  };
  
  return (
    <AuthLayout welcomeText={LOGIN_STRINGS.WELCOME_BACK}>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        onLogin={login}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  formContent: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  titleDecoration: {
    width: 72,
    height: 72,
    marginTop: 0,
  },
  loginTitle: {
    width: 120,
    height: 20,
    color: SHARED_CONSTANTS.COLORS.PRIMARY_GREEN,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 18,
  },
  inputSection: {
    marginTop: 20,
  },
  inputSpacing: {
    marginBottom: 15,
  },
  decorationContainer: {
    backgroundColor: 'transparent',
    height: 86,
    width: 72,
    position: 'absolute',
    left: width / 2 - 36,
    top: -20,
  },
  decorationImage: {
    height: 83,
    width: 70,
    marginTop: 2,
    marginLeft: 2,
    backgroundColor: 'transparent',
  },
});

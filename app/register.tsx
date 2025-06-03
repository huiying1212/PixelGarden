import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useRegister } from './hooks/useRegister';
import { useRouter } from "expo-router";
import AuthLayout from './components/common/AuthLayout';
import InputField from './components/common/InputField';
import ActionButton from './components/common/ActionButton';
import LinkPrompt from './components/common/LinkPrompt';
import { SHARED_CONSTANTS } from './components/common/constants';

// 类型定义
interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  age: string;
  setAge: (age: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  isLoading: boolean;
  errors: {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  errorMessages: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  validateEmail: (text: string) => Promise<boolean>;
  validateUsername: (text: string) => boolean;
  validatePassword: (text: string) => boolean;
  validateConfirmPassword: (text: string) => boolean;
  onRegister: () => Promise<void>;
  onNavigateToLogin: () => void;
}

// 常量定义
const REGISTER_STRINGS = {
  WELCOME_TITLE: '欢迎加入！',
  REGISTER_TITLE: '创建新账号',
  EMAIL_PLACEHOLDER: '邮箱',
  USERNAME_PLACEHOLDER: '用户名',
  PASSWORD_PLACEHOLDER: '密码',
  CONFIRM_PASSWORD_PLACEHOLDER: '确认密码',
  AGE_PLACEHOLDER: '年龄（可选）',
  GENDER_PLACEHOLDER: '性别（可选）',
  REGISTER_BUTTON: '注册',
  HAVE_ACCOUNT: '已有账号？',
  LOGIN: '登录'
} as const;

const { width, height } = Dimensions.get('window');

// 子组件：注册表单
const RegisterForm: React.FC<RegisterFormProps> = ({
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
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  onRegister,
  onNavigateToLogin
}) => {
  const router = useRouter();

  return (
    <>
      {Platform.OS !== 'web' && (
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          disabled={isLoading}
        >
          <Image source={SHARED_CONSTANTS.IMAGES.BACK_BUTTON} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      <Text style={styles.registerTitle}>{REGISTER_STRINGS.REGISTER_TITLE}</Text>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.USER_ICON}
          placeholder={REGISTER_STRINGS.EMAIL_PLACEHOLDER}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          isLoading={isLoading}
          hasError={errors.email}
          errorMessage={errorMessages.email}
          onValidate={validateEmail}
        />
        
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.USER_ICON}
          placeholder={REGISTER_STRINGS.USERNAME_PLACEHOLDER}
          value={username}
          onChangeText={setUsername}
          isLoading={isLoading}
          hasError={errors.username}
          errorMessage={errorMessages.username}
          onValidate={validateUsername}
        />
        
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.PASSWORD_ICON}
          placeholder={REGISTER_STRINGS.PASSWORD_PLACEHOLDER}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          isLoading={isLoading}
          hasError={errors.password}
          errorMessage={errorMessages.password}
          onValidate={(text) => {
            validatePassword(text);
            if (confirmPassword) validateConfirmPassword(confirmPassword);
          }}
        />
        
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.PASSWORD_ICON}
          placeholder={REGISTER_STRINGS.CONFIRM_PASSWORD_PLACEHOLDER}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          isLoading={isLoading}
          hasError={errors.confirmPassword}
          errorMessage={errorMessages.confirmPassword}
          onValidate={validateConfirmPassword}
        />
        
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.USER_ICON}
          placeholder={REGISTER_STRINGS.AGE_PLACEHOLDER}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          isLoading={isLoading}
          isOptional={true}
        />
        
        <InputField
          icon={SHARED_CONSTANTS.IMAGES.USER_ICON}
          placeholder={REGISTER_STRINGS.GENDER_PLACEHOLDER}
          value={gender}
          onChangeText={setGender}
          isLoading={isLoading}
          isOptional={true}
        />

        <ActionButton
          title={REGISTER_STRINGS.REGISTER_BUTTON}
          onPress={onRegister}
          isLoading={isLoading}
        />
        
        <LinkPrompt
          promptText={REGISTER_STRINGS.HAVE_ACCOUNT}
          linkText={REGISTER_STRINGS.LOGIN}
          onLinkPress={onNavigateToLogin}
        />
      </ScrollView>
    </>
  );
};

// 主组件
export default function RegisterScreen(): JSX.Element {
  const {
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
  } = useRegister();
  
  const router = useRouter();
  
  const handleNavigateToLogin = (): void => {
    router.push("/login");
  };
  
  return (
    <AuthLayout
      welcomeText={REGISTER_STRINGS.WELCOME_TITLE}
      headerHeight={0.25}
    >
      <RegisterForm
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        isLoading={isLoading}
        errors={errors}
        errorMessages={errorMessages}
        validateEmail={validateEmail}
        validateUsername={validateUsername}
        validatePassword={validatePassword}
        validateConfirmPassword={validateConfirmPassword}
        onRegister={register}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 10 : 20,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: SHARED_CONSTANTS.COLORS.PRIMARY_GREEN,
  },
  registerTitle: {
    width: 120,
    height: 20,
    color: SHARED_CONSTANTS.COLORS.PRIMARY_GREEN,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
}); 
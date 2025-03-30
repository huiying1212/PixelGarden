import { Alert, Platform } from 'react-native';

type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

// 跨平台的 Alert 显示函数
export const showAlert = (title: string, message: string, buttons?: AlertButton[]) => {
  if (Platform.OS === 'web') {
    // 网页版使用 window.alert
    window.alert(message);
    if (buttons && buttons[0]?.onPress) {
      buttons[0].onPress();
    }
  } else {
    // 移动端使用 React Native 的 Alert
    Alert.alert(title, message, buttons);
  }
}; 
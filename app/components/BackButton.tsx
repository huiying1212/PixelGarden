import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

interface BackButtonProps {
  onPress?: () => void;
  style?: object;
  imageSource?: any;
}

const BackButton = ({ onPress, style, imageSource }: BackButtonProps) => {
  const router = useRouter();
  
  // 默认的返回处理函数
  const handleBack = () => {
    router.back();
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress || handleBack}
    >
      <Image
        style={styles.icon}
        source={imageSource || require('../assets/img/backbutton.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default BackButton; 
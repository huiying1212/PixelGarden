import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SHARED_CONSTANTS, createSharedStyles } from './constants';

const { width, height } = Dimensions.get('window');
const sharedStyles = createSharedStyles(width, height);

interface AuthLayoutProps {
  welcomeText: string;
  headerHeight?: number;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  welcomeText,
  headerHeight = 0.4,
  children,
}) => {
  const dynamicStyles = StyleSheet.create({
    headerBackground: {
      height: height * headerHeight,
      width: width,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    formContainer: {
      position: 'relative',
      width: width,
      height: height * (1 - headerHeight),
      marginTop: height * headerHeight + (headerHeight === 0.4 ? 40 : 20),
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={sharedStyles.page}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={SHARED_CONSTANTS.IMAGES.BACKGROUND}
        style={sharedStyles.backgroundContainer}
        resizeMode="cover"
      >
        <ImageBackground
          source={SHARED_CONSTANTS.IMAGES.LOGIN_BACK}
          style={dynamicStyles.headerBackground}
          resizeMode="cover"
        >
          <View style={sharedStyles.welcomeContainer}>
            <Text style={sharedStyles.welcomeText}>{welcomeText}</Text>
          </View>
        </ImageBackground>

        <View style={dynamicStyles.formContainer}>
          {children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AuthLayout; 
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import { useAuth } from './hooks/useAuth';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, isLoading, login } = useAuth();
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground 
        source={require('./assets/img/FigmaDDSSlicePNG2de87e7d36b33f8b8880081a4d05c6c5.png')}
        style={styles.group_1}
        resizeMode="cover"
      >
        <ImageBackground
          source={require('./assets/img/FigmaDDSSlicePNG0db6292fbcd5d54678dcf30184830a97.png')}
          style={styles.group_2}
          resizeMode="cover"
        >
          <View style={styles.textWrapper_1}>
            <Text style={styles.text_2}>欢迎回来！</Text>
          </View>
        </ImageBackground>
        
        <View style={styles.group_3}>
          <View style={styles.group_4} />
          <Text style={styles.text_3}>登录您的账号</Text>
          
          <View style={styles.group_5}>
            <View style={styles.imageText_1}>
              <Image
                style={styles.thumbnail_2}
                source={require('./assets/img/FigmaDDSSlicePNGc6af75c9e69be82167f59e0c0a0f698e.png')}
              />
              <TextInput
                style={styles.textGroup_1}
                placeholder="账号"
                placeholderTextColor="rgba(0, 118, 114, 0.6)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
                maxLength={30}
              />
            </View>
          </View>
          
          <View style={styles.group_6}>
            <View style={styles.imageText_2}>
              <Image
                style={styles.thumbnail_3}
                source={require('./assets/img/FigmaDDSSlicePNG1bc2755ddc1fe574958e95c2833f8534.png')}
              />
              <TextInput
                style={styles.textGroup_2}
                placeholder="密码"
                placeholderTextColor="rgba(0, 118, 114, 0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
                maxLength={30}
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.textWrapper_2}
            onPress={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#093E27" size="small" />
            ) : (
              <Text style={styles.text_4}>确认</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.textWrapper_3}>
            <Text style={styles.text_5}>还没有账号？</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.text_6}>注册</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.group_7}>
            <ImageBackground 
              source={require('./assets/img/FigmaDDSSlicePNG0b59f1b1e43b19e915f1bd9a385e9092.png')} 
              style={styles.box_2}
              resizeMode="cover"
            >
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'relative',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  group_1: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  group_2: {
    height: height * 0.4,
    width: width,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  box_1: {
    width: width * 0.9,
    height: 30,
    marginTop: 50,
    marginLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_1: {
    width: 54,
    height: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 15,
    letterSpacing: -0.33,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 15,
  },
  thumbnail_1: {
    width: 18,
    height: 12,
    marginTop: 3,
    marginLeft: 'auto',
    marginRight: 5,
  },
  image_1: {
    width: 21,
    height: 15,
    marginTop: 2,
    marginRight: 5,
  },
  image_2: {
    width: 25,
    height: 12,
    marginTop: 3,
    marginRight: 10,
  },
  textWrapper_1: {
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
  text_2: {
    width: 120,
    height: 24,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 24,
    textShadowColor: 'rgba(60, 123, 85, 1)',
    textShadowOffset: { width: 0.4, height: 0.4 },
    textShadowRadius: 0.4,
  },
  group_3: {
    position: 'relative',
    width: width,
    height: height * 0.6,
    marginTop: height * 0.4 + 40,
    alignItems: 'center',
  },
  group_4: {
    backgroundColor: 'rgba(149, 193, 173, 1)',
    borderRadius: 50,
    width: 72,
    height: 24,
    marginTop: 30,
  },
  text_3: {
    width: 120,
    height: 20,
    color: 'rgba(9, 62, 39, 1)',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 18,
  },
  group_5: {
    shadowColor: 'rgba(20, 96, 58, 0.33)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    backgroundColor: 'rgba(251, 255, 244, 1)',
    borderRadius: 2,
    width: 297,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(60, 123, 85, 1)',
    marginTop: 32,
  },
  imageText_1: {
    width: '90%',
    height: 40,
    marginTop: 0,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail_2: {
    width: 20,
    height: 20,
  },
  textGroup_1: {
    flex: 1,
    height: 40,
    color: 'rgba(0, 118, 114, 1)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
    paddingVertical: 0,
  },
  group_6: {
    shadowColor: 'rgba(20, 96, 58, 0.33)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    backgroundColor: 'rgba(251, 255, 244, 1)',
    borderRadius: 2,
    width: 297,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(60, 123, 85, 1)',
    marginTop: 25,
  },
  imageText_2: {
    width: '90%',
    height: 40,
    marginTop: 0,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail_3: {
    width: 20,
    height: 20,
  },
  textGroup_2: {
    flex: 1,
    height: 40,
    color: 'rgba(0, 118, 114, 1)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
    paddingVertical: 0,
  },
  textWrapper_2: {
    shadowColor: 'rgba(20, 96, 58, 0.33)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    backgroundColor: 'rgba(105, 255, 183, 1)',
    borderRadius: 2,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(60, 123, 85, 1)',
    width: 96,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_4: {
    color: 'rgba(9, 62, 39, 1)',
    fontSize: 18,
    textAlign: 'center',
  },
  textWrapper_3: {
    width: 128,
    height: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_5: {
    color: 'rgba(0, 118, 114, 0.6)',
    fontSize: 16,
    textAlign: 'center',
  },
  text_6: {
    color: 'rgba(9, 62, 39, 1)',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  group_7: {
    backgroundColor: 'transparent',
    height: 86,
    width: 72,
    position: 'absolute',
    left: width / 2 - 36,
    top: -20,
  },
  box_2: {
    height: 83,
    width: 70,
    marginTop: 2,
    marginLeft: 2,
  },
  box_3: {
    height: 9,
    width: 54,
    marginTop: 72,
    marginLeft: 10,
  },
  section_1: {
    backgroundColor: 'rgba(7, 112, 54, 1)',
    width: 15,
    height: 5,
    marginTop: -4,
    marginLeft: 18,
  },
});

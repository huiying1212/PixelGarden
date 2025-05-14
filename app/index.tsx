import React, { useState, useEffect } from "react";
import { 
  View, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  ImageBackground, 
  Dimensions, 
  SafeAreaView,
  StatusBar,
  Platform,
  Animated 
} from "react-native";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalTabs from "./components/ModalTabs";
import FriendModal from "./components/FriendModal";
import { WebView } from 'react-native-webview';
import MessageModal from './components/MessageModal';
import PlantModal from './components/PlantModal';


const { width, height } = Dimensions.get('window');

// 预加载所有图片资源
const preloadImages = async () => {
  const images = [
    require("../app/assets/home_img/Rectangle55.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNG45b7b6265782e2dd5d0fdd1535fd84a2.png"),
    require("../app/assets/home_img/Rectangle45.png")
  ];
  
  await Promise.all(images.map(image => Asset.fromModule(image).downloadAsync()));
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [sunAmount, setSunAmount] = useState(100);
  const decorationSlideAnim = useState(new Animated.Value(0))[0];
  const iconsPositionAnim = useState(new Animated.Value(0))[0];
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(true);

  const dialogMessages = [
    "欢迎来到花园🌱",
    "点击我继续说话～",
    "小花很有精神，你的悉心照料让它茁壮成长！",
    "太棒了！因为有你，花园更加生机勃勃",
    "好久没来看我啦，我有点想你~",
  ];

  useEffect(() => {
    // 组件挂载时预加载所有图片
    const loadImages = async () => {
      try {
        await preloadImages();
        setImagesLoaded(true);
      } catch (error) {
        console.error("图片预加载失败:", error);
        // 即使加载失败也设为true，让应用可以继续使用
        setImagesLoaded(true);
      }
    };
    
    loadImages();
  }, []);

  const renderIcons = () => {
    const icons = [];
    const iconCount = 8;
    
    // 计算每行显示的图标数
    const iconsPerRow = 4;
    const rows = Math.ceil(iconCount / iconsPerRow);
    
    for (let i = 0; i < rows; i++) {
      const rowIcons = [];
      for (let j = 0; j < iconsPerRow; j++) {
        const iconIndex = i * iconsPerRow + j;
        if (iconIndex < iconCount) {
          rowIcons.push(
            <Image
              key={`icon-${iconIndex}`}
              style={styles.icon}
              source={require("../app/assets/home_img/FigmaDDSSlicePNG45b7b6265782e2dd5d0fdd1535fd84a2.png")}
            />
          );
        }
      }
      icons.push(
        <View key={`row-${i}`} style={styles.iconRow}>
          {rowIcons}
        </View>
      );
    }
    
    return icons;
  };

  const toggleDecorations = () => {
    const newValue = !showDecorations;
    setShowDecorations(newValue);
    Animated.parallel([
      Animated.timing(decorationSlideAnim, {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(iconsPositionAnim, {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const updateSunAmount = (amount: number) => {
    setSunAmount(prev => prev + amount);
  };

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* WebGL 页面作为背景 */}
      <WebView 
        source={{ uri: 'https://ai-garden-flax.vercel.app/' }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.group_1}>
          <View style={styles.block_2}>
            {/* 留出时间信号栏的空间 */}
          </View>
          
          <View style={styles.imageWrapper_1}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                style={styles.label_1}
                source={require("../app/assets/home_img/FigmaDDSSlicePNG4d18dfe8145a98ae121d9b0d26ddcd2c.png")}
              />
            </TouchableOpacity>
            
            <View style={styles.infoPanelContainer}>
              <View style={styles.infoPanelRow}>
                <Text style={styles.infoPanelText}>第1天 / 第2周</Text>
              </View>
              <View style={[styles.infoPanelRow, styles.sunRow]}>
                <TouchableOpacity 
                  style={styles.sunButton}
                  onPress={() => setShowPlantModal(true)}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={require("../app/assets/flowers/sun.png")}
                    style={styles.sunIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.infoPanelText}>{sunAmount}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.verticalLabelsContainer}>
              <TouchableOpacity onPress={() => setShowTaskModal(true)}>
                <Image
                  style={styles.label_3}
                  source={require("../app/assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFriendModal(true)}>
                <Image
                  style={styles.label_4}
                  source={require("../app/assets/home_img/friends.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDecorations}>
                <Image
                  style={styles.label_5}
                  source={require("../app/assets/home_img/decoration.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.mailboxButton}
            onPress={() => setMessageModalVisible(true)}
          >
          <Image
            source={require("../app/assets/home_img/mailbox.png")}
              style={styles.mailboxIcon}
            resizeMode="contain"
          />
          </TouchableOpacity>
          
          <Animated.View 
            style={[
              styles.block_5,
              {
                transform: [
                  {
                    translateY: decorationSlideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
                opacity: decorationSlideAnim
              }
            ]}
          >
            <Image
              style={styles.bottomImage}
              source={require("../app/assets/home_img/Rectangle45.png")}
            />
            <View style={styles.iconsContainer}>
              {renderIcons()}
            </View>
          </Animated.View>
          
          <Animated.View style={[
            styles.bottomButtonsContainer,
            {
              transform: [
                {
                  translateY: iconsPositionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -215],  // 向上移动100单位
                  })
                }
              ]
            }
          ]}>
            {showDialog && (
              <ImageBackground
                source={require("../app/assets/home_img/talk.png")}
                style={styles.dialogBubble}
                imageStyle={{resizeMode: 'stretch'}}
              >
                <Text style={styles.dialogText}>{dialogMessages[dialogIndex]}</Text>
              </ImageBackground>
            )}
            <TouchableOpacity 
              style={styles.label_7} 
              onPress={() => router.push("/record")}
            >
              <Image
                style={styles.fullSize}
                source={require("../app/assets/home_img/record.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.newImage}
              onPress={() => {
                setDialogIndex((prev) => (prev + 1) % dialogMessages.length);
                setShowDialog(true);
              }}
            >
              <Image
              source={require("../app/assets/home_img/sprite.png")}
                style={styles.fullSize}
              resizeMode="contain"
            />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      
      {/* 各种模态框 */}
      <ModalTabs 
        visible={showTaskModal} 
        onClose={() => setShowTaskModal(false)}
        updateSunAmount={updateSunAmount}
      />
      {showFriendModal && (
        <FriendModal visible={showFriendModal} onClose={() => setShowFriendModal(false)} />
      )}
      <MessageModal 
        visible={isMessageModalVisible}
        onClose={() => setMessageModalVisible(false)}
      />
      <PlantModal
        visible={showPlantModal}
        onClose={() => setShowPlantModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  contentContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1,
    top: 0,
    left: 0,
  },
  group_1: {
    position: 'relative',
    width: width,
    height: height * 0.78,
  },
  block_2: {
    width: width * 0.9, // 339px 相对于 375px 的比例
    height: 18,
    marginTop: 25,
    marginLeft: width * 0.05,
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
    marginRight: 5,
  },
  imageWrapper_1: {
    width: width * 0.9,
    height: 70,
    marginTop: 12,
    marginLeft: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label_1: {
    width: 48,
    height: 48,
  },
  verticalLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 48,
    marginLeft: 0,
  },
  label_2: {
    width: 32,
    height: 32,
  },
  label_3: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  label_4: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  label_5: {
    width: 32,
    height: 32,
  },
  block_5: {
    backgroundColor: 'transparent',
    height: 40,
    width: width,
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
  },
  bottomImage: {
    width: width,
    position: 'absolute',
    top: 30,
    left: 0,
  },
  iconsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: width,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconRow: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginVertical: 1,
  },
  icon: {
    width: width / 5,
    height: 100,
    resizeMode: 'contain',
  },
  centerImage: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.7,
    left: width * 0.05,
    top: height * 0.3,
    zIndex: 1,
  },
  imageContainer: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    width: width,
    bottom: 1,
    left: 0,
    zIndex: 3,
  },
  mailboxButton: {
    position: 'absolute',
    right: width * 0.08,
    bottom: height * 0.08,
    width: 60,
    height: 60,
    zIndex: 1,
  },
  mailboxIcon: {
    width: '100%',
    height: '100%',
  },
  label_7: {
    position: 'absolute',
    right: 20,
    bottom: -150,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  fullSize: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  newImage: {
    position: 'absolute',
    left: 20,
    bottom: -150,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  image_10: {
    width: width / 7,
    height: 28,
    resizeMode: 'contain',
  },
  dialogBubble: {
    position: 'absolute',
    left: 40,
    bottom: -60,
    width: width * 0.5,
    aspectRatio: 3,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    marginTop: 1,
  },
  infoPanelContainer: {
    position: 'absolute',
    left: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 48,
  },
  infoPanelRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunRow: {
    marginTop: 4,
  },
  infoPanelText: {
    color: '#3C7B55',
    fontSize: 14,
    fontWeight: '600',
  },
  sunIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  sunButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
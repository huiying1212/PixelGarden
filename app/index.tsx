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


  const { width, height } = Dimensions.get('window');

  // 预加载所有图片资源
  const preloadImages = async () => {
    const images = [
      require("../app/assets/home_img/Rectangle55.png"),
      require("../app/assets/home_img/1.png"),
      require("../app/assets/home_img/2.png"),
      require("../app/assets/home_img/3.png"),
      require("../app/assets/home_img/4.png"),
      require("../app/assets/home_img/5.png"),
      require("../app/assets/home_img/6.png"),
      require("../app/assets/home_img/7.png"),
      require("../app/assets/home_img/8.png"),
      require("../app/assets/home_img/unget.png"),
      require("../app/assets/home_img/unused.png"),
      require("../app/assets/home_img/used.png"),
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
     
      // 处理图标点击事件
      const handleIconPress = (iconIndex: number) => {
        const newSelectedIcons = [...selectedIcons];
        newSelectedIcons[iconIndex] = !newSelectedIcons[iconIndex];
        setSelectedIcons(newSelectedIcons);
      };
     
      for (let i = 0; i < rows; i++) {
        const rowIcons = [];
        for (let j = 0; j < iconsPerRow; j++) {
          const iconIndex = i * iconsPerRow + j;
          if (iconIndex < iconCount) {
            let iconSource;
            switch(iconIndex) {
              case 0:
                iconSource = require("../app/assets/home_img/1.png");
                break;
              case 1:
                iconSource = require("../app/assets/home_img/2.png");
                break;
              case 2:
                iconSource = require("../app/assets/home_img/3.png");
                break;
              case 3:
                iconSource = require("../app/assets/home_img/4.png");
                break;
              case 4:
                iconSource = require("../app/assets/home_img/5.png");
                break;
              case 5:
                iconSource = require("../app/assets/home_img/6.png");
                break;
              case 6:
                iconSource = require("../app/assets/home_img/7.png");
                break;
              case 7:
                iconSource = require("../app/assets/home_img/8.png");
                break;
              default:
                iconSource = require("../app/assets/home_img/1.png");
            }
           
            // 为所有图标使用统一的容器结构
            rowIcons.push(
              <TouchableOpacity
                key={`icon-container-${iconIndex}`}
                style={styles.iconWithBaseContainer}
                onPress={() => handleIconPress(iconIndex)}
              >
                {/* 1-6号图标根据选中状态显示不同底图 */}
                {iconIndex <= 5 && (
                  <Image
                    style={styles.iconBase}
                    source={selectedIcons[iconIndex]
                      ? require("../app/assets/home_img/used.png")
                      : require("../app/assets/home_img/unused.png")
                    }
                  />
                )}
               
                {/* 7-8号图标显示unget.png底图 */}
                {(iconIndex === 6 || iconIndex === 7) && (
                  <Image
                    style={styles.iconBase}
                    source={require("../app/assets/home_img/unget.png")}
                  />
                )}
               
                <Image
                  key={`icon-${iconIndex}`}
                  style={styles.icon}
                  source={iconSource}
                />
              </TouchableOpacity>
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

// 从 ps-newthings 引入
const updateSunAmount = (amount: number) => {
  setSunAmount(prev => prev + amount);
};

// 从 page-refined 引入
const toggleDecorations = () => {
  const newValue = !showDecorations;
  setShowDecorations(newValue);
  Animated.parallel([
    Animated.timing(decorationSlideAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: true, // 假设你希望保留 page-refined 的 useNativeDriver: true
    }),
    Animated.timing(iconsPositionAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: true, // 假设你希望保留 page-refined 的 useNativeDriver: true
    })
  ]).start();
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

          {/* 从 ps-newthings 引入 infoPanelContainer */}
          <View style={styles.infoPanelContainer}>
            <View style={styles.infoPanelRow}>
              <Text style={styles.infoPanelText}>第1天 / 第2周</Text>
            </View>
            <View style={[styles.infoPanelRow, styles.sunRow]}>
              <TouchableOpacity
                style={styles.sunButton}
                onPress={() => setShowPlantModal(true)} // 来自 ps-newthings
                activeOpacity={0.7}
              >
                <Image
                  source={require("../app/assets/flowers/sun.png")} // 来自 ps-newthings
                  style={styles.sunIcon}
                  resizeMode="contain"
                />
                <Text style={styles.infoPanelText}>{sunAmount}</Text> {/* 来自 ps-newthings */}
              </TouchableOpacity>
            </View>
          </View>

          {/* verticalLabelsContainer 两个分支中是相同的 */}
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
            <TouchableOpacity onPress={toggleDecorations}> {/* onPress 来自 page-refined */}
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
                  outputRange: [0, -215], // 向上移动100单位 (原文注释是100，但代码是215，以代码为准)
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
    {/* 合并 ModalTabs: 使用 ps-newthings 的 prop，可以选择 page-refined 的渲染风格 */}
    <ModalTabs
      visible={showTaskModal}
      onClose={() => setShowTaskModal(false)}
      updateSunAmount={updateSunAmount} // 来自 ps-newthings
    />
    {/* FriendModal: 保持 page-refined 的渲染风格或改为直接渲染 */}
    {showFriendModal && (
      <FriendModal visible={showFriendModal} onClose={() => setShowFriendModal(false)} />
    )}
    <MessageModal
      visible={isMessageModalVisible}
      onClose={() => setMessageModalVisible(false)}
    />
    {/* 从 ps-newthings 引入 PlantModal */}
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
    iconWithBaseContainer: {
      position: 'relative',
      width: 60,
      height: 95,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconBase: {
      position: 'absolute',
      top: 0,
      width: '115%',
      height: '115%',
      resizeMode: 'contain',
      zIndex: 1,
    },
    icon: {
      width: '65%',
      height: '65%',
      resizeMode: 'contain',
      zIndex: 2,
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
  });
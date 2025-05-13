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
  Platform 
} from "react-native";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import TaskScreen from './TaskScreen';
import ModalTabs from "./components/ModalTabs";

const { width, height } = Dimensions.get('window');

// 预加载所有图片资源
const preloadImages = async () => {
  const images = [
    require("../app/assets/home_img/Rectangle55.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNGc0b99b6d8ec8864b2f76a507b0ce9bc3.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNGb8496032da47137ff7cbc305cbb90a1f.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNG9594b6172677a226ed164b5759827904.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNG45b7b6265782e2dd5d0fdd1535fd84a2.png"),
    require("../app/assets/home_img/Rectangle45.png")
  ];
  
  await Promise.all(images.map(image => Asset.fromModule(image).downloadAsync()));
};

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

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

  const getIconCount = (index: number): number => {
    switch(index) {
      case 0: return 8;
      case 1: return 2;
      case 2: return 6;
      default: return 8;
    }
  };

  const renderIcons = () => {
    const iconCount = getIconCount(selectedTabIndex);
    const icons = [];
    
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

  // 预渲染指示器图片，避免点击时的延迟
  const renderIndicator = () => {
    return (
      <Image
        style={[styles.tabIndicator, { opacity: 0 }]}
        source={require("../app/assets/home_img/Rectangle55.png")}
      />
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground 
        source={require("../app/assets/home_img/FigmaDDSSlicePNGfacb732fdaf86c52daa278a6edbef403.png")}
        style={styles.block_1}
        resizeMode="cover"
      >
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
            <View style={styles.verticalLabelsContainer}>
              <Image
                style={styles.label_2}
                source={require("../app/assets/home_img/FigmaDDSSlicePNGc962ef08aac3b1b358b4af3563566ed7.png")}
              />
              <TouchableOpacity onPress={() => setShowTaskModal(true)}>
                <Image
                  style={styles.label_3}
                  source={require("../app/assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Image
                style={styles.label_4}
                source={require("../app/assets/home_img/FigmaDDSSlicePNGd9a61de4941347fad48290e17e6d5b9d.png")}
              />
              <Image
                style={styles.label_5}
                source={require("../app/assets/home_img/FigmaDDSSlicePNGb3b272f2ee7fa5d64fdd2800391af37a.png")}
              />
            </View>
          </View>
          
          <View style={styles.block_5}>
            <View style={styles.imageWrapper_5}>
              <TouchableOpacity onPress={() => setSelectedTabIndex(0)}>
                <View>
                  <Image
                    style={styles.image_7}
                    source={require("../app/assets/home_img/FigmaDDSSlicePNGc0b99b6d8ec8864b2f76a507b0ce9bc3.png")}
                  />
                  {selectedTabIndex === 0 && (
                    <Image
                      style={styles.tabIndicator}
                      source={require("../app/assets/home_img/Rectangle55.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTabIndex(1)}>
                <View>
                  <Image
                    style={styles.image_7}
                    source={require("../app/assets/home_img/FigmaDDSSlicePNGb8496032da47137ff7cbc305cbb90a1f.png")}
                  />
                  {selectedTabIndex === 1 && (
                    <Image
                      style={styles.tabIndicator}
                      source={require("../app/assets/home_img/Rectangle55.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTabIndex(2)}>
                <View>
                  <Image
                    style={styles.image_7}
                    source={require("../app/assets/home_img/FigmaDDSSlicePNG9594b6172677a226ed164b5759827904.png")}
                  />
                  {selectedTabIndex === 2 && (
                    <Image
                      style={styles.tabIndicator}
                      source={require("../app/assets/home_img/Rectangle55.png")}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.bottomImage}
              source={require("../app/assets/home_img/Rectangle45.png")}
            />
            <View style={styles.iconsContainer}>
              {renderIcons()}
            </View>
            {/* 预渲染指示器 */}
            {renderIndicator()}
          </View>
          
          <TouchableOpacity 
            style={styles.label_7} 
            onPress={() => router.push("/record")}
          >
            <Image
              style={styles.fullSize}
              source={require("../app/assets/home_img/FigmaDDSSlicePNG5bc52336be2f3f787cb8ddaa1e0509e6.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <Image
            style={styles.newImage}
            source={require("../app/assets/home_img/FigmaDDSSlicePNG8d2bc073980887ad18c3dc69f7f7d02e.png")}
            resizeMode="contain"
          />
        </View>
        
      </ImageBackground>
      {showTaskModal && (
        <ModalTabs visible={showTaskModal} onClose={() => setShowTaskModal(false)} />
      )}
      <Image
        style={styles.centerImage}
        source={require("../app/assets/home_img/FigmaDDSSlicePNG52fe158eae9a10dd1e7ed77674089882.png")}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'relative',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  block_1: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  group_1: {
    position: 'relative',
    width: width,
    height: height * 0.78, // 634px 相对于 812px 的比例
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
    height: 48,
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  label_2: {
    width: 32,
    height: 32,
  },
  label_3: {
    width: 32,
    height: 32,
    marginTop: 15,
  },
  label_4: {
    width: 32,
    height: 32,
    marginTop: 15,
  },
  label_5: {
    width: 32,
    height: 32,
    marginTop: 15,
  },
  block_5: {
    backgroundColor: 'rgba(196, 232, 217, 0.621)',
    height: 40,
    width: width,
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
  },
  imageWrapper_5: {
    width: width * 0.67, // 252px 相对于 375px 的比例
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: width * 0.16, // 大约水平居中
  },
  image_7: {
    width: 76,
    height: 32,
    marginRight: 12,
  },
  imageWrapper_6: {
    height: 75,
    width: 62,
    position: 'absolute',
    left: width * 0.12,
    top: 502,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label_7: {
    position: 'absolute',
    right: 20,
    bottom: height * 0.05 + 50, // 定位在block_5上方
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  newImage: {
    position: 'absolute',
    left: 20,
    bottom: height * 0.05 + 50, // 与label_7对称
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
  bottomImage: {
    width: width,
    position: 'absolute',
    top: 40,
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
  tabIndicator: {
    width: 76,
    height: 32,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
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
});
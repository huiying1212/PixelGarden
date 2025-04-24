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
            <Image
              style={styles.label_2}
              source={require("../app/assets/home_img/FigmaDDSSlicePNGc962ef08aac3b1b358b4af3563566ed7.png")}
            />
          </View>
          
          <View style={styles.imageWrapper_2}>
            <Image
              style={styles.label_3}
              source={require("../app/assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png")}
            />
          </View>
          
          <View style={styles.imageWrapper_3}>
            <Image
              style={styles.image_3}
              source={require("../app/assets/home_img/FigmaDDSSlicePNG1ee3062b921c2fddc770115f541327a9.png")}
            />
            <Image
              style={styles.label_4}
              source={require("../app/assets/home_img/FigmaDDSSlicePNGd9a61de4941347fad48290e17e6d5b9d.png")}
            />
          </View>
          
          <View style={styles.imageWrapper_4}>
            <Image
              style={styles.image_4}
              source={require("../app/assets/home_img/FigmaDDSSlicePNG6e653f4b89407746d6ed9540d922db47.png")}
            />
            <Image
              style={styles.label_5}
              source={require("../app/assets/home_img/FigmaDDSSlicePNGb3b272f2ee7fa5d64fdd2800391af37a.png")}
            />
          </View>
          
          <View style={styles.block_3}>
            <View style={styles.box_1}>
              <ImageBackground
                style={styles.group_2}
                source={require("../app/assets/home_img/FigmaDDSSlicePNG52fe158eae9a10dd1e7ed77674089882.png")}
                resizeMode="cover"
              >
                <View style={styles.group_4}>
                    <View style={styles.block_4}>
                      <View style={styles.textWrapper_1}>
                        <Text style={styles.text_2}>今天的花园真美~</Text>
                      </View>
                    </View>
                  </View>
              </ImageBackground>
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
          
          <Image
            style={styles.image_8}
            source={require("../app/assets/home_img/FigmaDDSSlicePNG09a9c7f4c62224d2bf76dc99a98bf8d4.png")}
          />
          
          <Image
            style={styles.label_6}
            source={require("../app/assets/home_img/FigmaDDSSlicePNG5688f8ba0ce5fa503e4fb09624477806.png")}
          />
          
         
          <Image
            style={styles.label_7}
            source={require("../app/assets/home_img/FigmaDDSSlicePNG5bc52336be2f3f787cb8ddaa1e0509e6.png")}
          />
        </View>
        
      </ImageBackground>
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
    alignItems: 'center',
  },
  label_1: {
    width: 48,
    height: 48,
  },
  label_2: {
    width: 32,
    height: 32,
  },
  imageWrapper_2: {
    height: 25,
    width: 82,
    marginTop: 10,
    marginLeft: width * 0.5,
    position: 'absolute',
    right: 20,
    top: 85,
  },
  label_3: {
    width: 32,
    height: 32,
    marginTop: -10,
    marginLeft: 36,
  },
  imageWrapper_3: {
    width: width * 0.78, // 294px 相对于 375px 的比例
    height: 44,
    marginTop: 1,
    marginLeft: width * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 120,
  },
  image_3: {
    width: 77,
    height: 39,
  },
  label_4: {
    width: 32,
    height: 32,
    marginTop: 12,
  },
  imageWrapper_4: {
    width: 168,
    height: 45,
    marginTop: 6,
    position: 'absolute',
    right: 20,
    top: 170,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_4: {
    width: 103,
    height: 45,
  },
  label_5: {
    width: 32,
    height: 32,
    marginTop: 10,
  },
  block_3: {
    backgroundColor: 'rgba(60, 101, 81, 0.61)',
    height: 168,
    width: width * 0.88, // 331px 相对于 375px 的比例
    position: 'absolute',
    left: width * 0.06,
    top: 270,
  },
  box_1: {
    position: 'relative',
    width: 210,
    height: 131,
    marginTop: -47,
    marginLeft: 129,
  },
  group_2: {
    height: 131,
    width: 210,
    position: 'absolute',
    left: -35,
    top: 18,
  },
  group_3: {
    height: 131,
    width: 210,
    position: 'relative',
  },
  image_5: {
    width: 76,
    height: 39,
    marginTop: 4,
    marginLeft: 65,
  },
  group_4: {
    height: 131,
    width: 210,
    position: 'absolute',
    left: -35,
    top: 18,
  },
  block_4: {
    height: 131,
    width: 210,
  },
  textWrapper_1: {
    backgroundColor: 'rgba(251, 255, 244, 1)',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(60, 123, 85, 1)',
    width: 130,
    marginTop: 76,
    marginLeft: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_2: {
    width: 113,
    height: 15,
    color: 'rgba(9, 62, 39, 1)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 15,
  },
  image_6: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 68,
    height: 68,
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
  image_8: {
    position: 'absolute',
    left: width * 0.1,
    top: 214,
    width: 82,
    height: 25,
  },
  label_6: {
    position: 'absolute',
    left: width * 0.15,
    top: 126,
    width: 46,
    height: 23,
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
  image_9: {
    width: 48,
    height: 8,
    marginBottom: 3,
  },
  label_7: {
    position: 'absolute',
    right: 30,
    top: 527,
    width: 48,
    height: 48,
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
});
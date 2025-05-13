import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

const flowers = [
  { name: '小黄花', icon: require('./assets/flowers/flower1.png') },
  { name: '向日葵', icon: require('./assets/flowers/flower2.png') },
  { name: '玫瑰花', icon: require('./assets/flowers/flower3.png') },
  { name: '雏菊', icon: require('./assets/flowers/flower4.png') },
  { name: '绣球花', icon: require('./assets/flowers/flower5.png') },
  { name: '白色花', icon: require('./assets/flowers/flower6.png') },
  { name: '郁金香', icon: require('./assets/flowers/flower7.png') },
  { name: '粉色花', icon: require('./assets/flowers/flower8.png') },
  { name: '未知', icon: require('./assets/flowers/flower9.png') },
];

export default function GalleryScreen() {
  return (
    <View style={styles.grid}>
      {flowers.map((flower, index) => (
        <View key={index} style={styles.gridItem}>
          <ImageBackground
            source={{
              uri: 'https://lanhu-oss-2537-2.lanhuapp.com/FigmaDDSSlicePNGde1e4d5d6917d01a404cd32980a3fb00.png',
            }}
            style={styles.imageBackground}
            imageStyle={styles.backgroundImageStyle} // <-- 添加这行控制背景图片圆角
          >
            {flower.icon ? (
              <Image source={flower.icon} style={styles.flowerImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>？</Text>
              </View>
            )}
          </ImageBackground>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  gridItem: {
    width: 64,
    height: 64,
    margin: 6,
    borderRadius: 8,
    overflow: 'hidden', // 确保圆角生效
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    resizeMode: 'stretch', // 或者 cover，取决于背景图效果
    borderRadius: 8,
  },
  flowerImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 20,
  },
  placeholderText: {
    fontSize: 24,
    color: '#aaa',
  },
});

import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const ImageWrapper = () => {
  return (
    <View style={styles.imageWrapper}>
      <ImageBackground
        source={{ uri: 'https://lanhu-oss-2537-2.lanhuapp.com/FigmaDDSSlicePNGde1e4d5d6917d01a404cd32980a3fb00.png' }}
        style={styles.imageBackground}
      >
        {/* 可以在这里放置其他元素，比如文本、图标等 */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: 64,
    width: 64,
    marginRight: 17,
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // equivalent to background-size: 100% 100% in CSS
  },
});

export default ImageWrapper; 
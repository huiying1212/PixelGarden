import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface BackgroundWebViewProps {
  uri: string;
}

const { width, height } = Dimensions.get('window');

const BackgroundWebView: React.FC<BackgroundWebViewProps> = ({ uri }) => {
  return (
    <WebView
      source={{ uri }}
      style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});

export default BackgroundWebView; 
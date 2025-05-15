import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface BackgroundWebViewProps {
  uri: string;
  onLoadComplete?: (isLoaded: boolean) => void;
}

const { width, height } = Dimensions.get('window');

const BackgroundWebView: React.FC<BackgroundWebViewProps> = ({ uri, onLoadComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const webViewRef = useRef<WebView>(null);
  
  // 创建注入的JavaScript代码，用于检测Unity加载完成
  const injectedJavaScript = `
    window.addEventListener('message', function(e) {
      // 假设Unity会发送一个加载完成的消息
      if (e.data && e.data.includes && e.data.includes('unityGameReady')) {
        window.ReactNativeWebView.postMessage('unityGameLoaded');
      }
    });
    
    // 监听DOM变化，也可以用于检测Unity加载
    const observer = new MutationObserver(function(mutations) {
      // Unity加载完成通常会移除加载中的元素或添加某个特定元素
      if (document.getElementById('unity-canvas') && 
          document.getElementById('unity-loading-bar') && 
          document.getElementById('unity-loading-bar').style.display === 'none') {
        window.ReactNativeWebView.postMessage('unityGameLoaded');
        observer.disconnect();
      }
    });
    
    // 开始观察document变化
    observer.observe(document, { childList: true, subtree: true });
    
    // 如果5秒后还没检测到，默认认为已加载（备用方案）
    setTimeout(function() {
      window.ReactNativeWebView.postMessage('unityGameLoaded');
    }, 5000);
    true;
  `;
  
  const handleLoadComplete = () => {
    // 仅记录WebView本身加载完成，但Unity可能还在加载中
    console.log('WebView loaded, waiting for Unity...');
  };
  
  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    if (data === 'unityGameLoaded' && !isLoaded) {
      console.log('Unity fully loaded!');
      setIsLoaded(true);
      if (onLoadComplete) {
        onLoadComplete(true);
      }
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
      scrollEnabled={false}
      onLoadEnd={handleLoadComplete}
      onMessage={onMessage}
      injectedJavaScript={injectedJavaScript}
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
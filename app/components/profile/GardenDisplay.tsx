import React from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface GardenDisplayProps {
  gardenSnapshot: string | null;
  isLoading: boolean;
  isDataLoading: boolean;
}

export default function GardenDisplay({ gardenSnapshot, isLoading, isDataLoading }: GardenDisplayProps) {
  if (isLoading || isDataLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3C7B55" />
          <Text style={styles.loadingText}>正在加载花园数据...</Text>
        </View>
      </View>
    );
  }

  // 使用hook中的gardenSnapshot数据
  if (gardenSnapshot && typeof gardenSnapshot === 'string' && (
      gardenSnapshot.startsWith('http://') || 
      gardenSnapshot.startsWith('https://') || 
      gardenSnapshot.startsWith('data:image/')
    )) {
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: gardenSnapshot }}
          style={styles.activityIcon}
          resizeMode="cover"
          onError={(error) => {
            console.warn('花园图片加载失败:', error);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.emptyGardenContainer}>
        <Text style={styles.emptyGardenText}>暂无花园图片</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderColor: '#3C7B55',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  loadingText: {
    color: '#093E27',
    fontSize: 16,
    marginTop: 10,
  },
  activityIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  emptyGardenContainer: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  emptyGardenText: {
    color: '#093E27',
    fontSize: 16,
    opacity: 0.7,
  },
}); 
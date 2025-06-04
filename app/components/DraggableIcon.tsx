import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

interface DraggableIconProps {
  index: number;
  source: any;
  baseSource: any;
  isSelected: boolean;
  onPress: (index: number) => void;
  onDragRelease?: (index: number, isDragged: boolean) => void;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({
  index,
  source,
  baseSource,
  isSelected,
  onPress,
  onDragRelease
}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  
  // 检查初始状态是否已经被选中（used状态）
  useEffect(() => {
    if (isSelected) {
      setHasBeenDragged(true);
    }
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
        setIsDragging(true);
        position.extractOffset();
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        // 如果拖拽距离超过阈值，标记为已拖拽
        if (!hasBeenDragged && (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10)) {
          setHasBeenDragged(true);
        }
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
        setIsDragging(false);
        
        // 通知父组件这个图标已被拖拽
        if (hasBeenDragged && onDragRelease) {
          onDragRelease(index, true);
        }
      },
    })
  ).current;
  
  // 计算当前应该显示的底图
  const currentBaseSource = hasBeenDragged ? 
    require('../../app/assets/home_img/used.png') : 
    require('../../app/assets/home_img/unused.png');
  
  return (
    <View style={styles.container}>
      {/* 底图不随拖拽移动，固定在原位置，根据拖拽状态切换图片 */}
      <Image
        style={styles.iconBase}
        source={hasBeenDragged ? require('../../app/assets/home_img/used.png') : baseSource}
      />
      
      {/* 只有图标可以拖拽 */}
      <Animated.View
        style={[
          position.getLayout(),
          styles.iconWrapper,
          { zIndex: isDragging ? 99 : 2 }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPress(index)}
          style={styles.touchable}
        >
          <Image
            style={styles.icon}
            source={source}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 60,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '115%',
    height: '115%',
    resizeMode: 'contain',
    zIndex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
  },
});

export default DraggableIcon; 
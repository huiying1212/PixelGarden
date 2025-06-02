import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ICON_COUNT, ICONS_PER_ROW, ICON_SOURCES } from './constants';
import DraggableIcon from '../DraggableIcon';

interface IconRendererProps {
  selectedIcons: boolean[];
  onIconPress: (iconIndex: number) => void;
  onDragRelease: (iconIndex: number, isDragged: boolean) => void;
}

const IconRenderer: React.FC<IconRendererProps> = ({
  selectedIcons,
  onIconPress,
  onDragRelease,
}) => {
  const renderIcons = () => {
    const icons = [];
    const rows = Math.ceil(ICON_COUNT / ICONS_PER_ROW);

    for (let i = 0; i < rows; i++) {
      const rowIcons = [];
      for (let j = 0; j < ICONS_PER_ROW; j++) {
        const iconIndex = i * ICONS_PER_ROW + j;
        if (iconIndex < ICON_COUNT) {
          const iconSource = ICON_SOURCES[iconIndex];
         
          // 对1-6号图标实现拖拽功能
          if (iconIndex <= 5) {
            rowIcons.push(
              <DraggableIcon
                key={`draggable-icon-${iconIndex}`}
                index={iconIndex}
                source={iconSource}
                baseSource={selectedIcons[iconIndex]
                  ? require("../../assets/home_img/used.png")
                  : require("../../assets/home_img/unused.png")
                }
                isSelected={selectedIcons[iconIndex]}
                onPress={onIconPress}
                onDragRelease={onDragRelease}
              />
            );
          } else {
            // 7-8号图标保持原有的非拖拽形式
            rowIcons.push(
              <TouchableOpacity
                key={`icon-container-${iconIndex}`}
                style={styles.iconWithBaseContainer}
                onPress={() => onIconPress(iconIndex)}
              >
                <Image
                  style={styles.iconBase}
                  source={require("../../assets/home_img/unget.png")}
                />
                <Image
                  key={`icon-${iconIndex}`}
                  style={styles.icon}
                  source={iconSource}
                />
              </TouchableOpacity>
            );
          }
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

  return <>{renderIcons()}</>;
};

const styles = StyleSheet.create({
  iconRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
});

export default IconRenderer; 
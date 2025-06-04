import React from 'react';
import { View, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import IconRenderer from './IconRenderer';

const { width, height } = Dimensions.get('window');

interface BottomContentProps {
  webGLLoaded: boolean;
  showDialog: boolean;
  dialogIndex: number;
  dialogMessages: string[];
  showDecorations: boolean;
  decorationSlideAnim: Animated.Value;
  iconsPositionAnim: Animated.Value;
  selectedIcons: boolean[];
  onIconPress: (iconIndex: number) => void;
  onDragRelease: (iconIndex: number, isDragged: boolean) => void;
  onDialogPress: () => void;
  onMessagePress: () => void;
}

const BottomContent: React.FC<BottomContentProps> = ({
  webGLLoaded,
  showDialog,
  dialogIndex,
  dialogMessages,
  showDecorations,
  decorationSlideAnim,
  iconsPositionAnim,
  selectedIcons,
  onIconPress,
  onDragRelease,
  onDialogPress,
  onMessagePress,
}) => {
  const router = useRouter();

  return (
    <>
      {/* 邮箱按钮 */}
      {webGLLoaded && (
        <TouchableOpacity
          style={styles.mailboxButton}
          onPress={onMessagePress}
        >
          <Image
            source={require("../../assets/home_img/mailbox.png")}
            style={styles.mailboxIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {/* 装饰面板 */}
      <Animated.View
        style={[
          styles.decorationPanel,
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
          source={require("../../assets/home_img/Rectangle45.png")}
        />
        <View style={styles.iconsContainer}>
          <IconRenderer
            selectedIcons={selectedIcons}
            onIconPress={onIconPress}
            onDragRelease={onDragRelease}
          />
        </View>
      </Animated.View>

      {/* 底部按钮容器 */}
      <Animated.View style={[
        styles.bottomButtonsContainer,
        {
          transform: [
            {
              translateY: iconsPositionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -215],
              })
            }
          ]
        }
      ]}>
        {/* 对话气泡 */}
        {webGLLoaded && showDialog && (
          <ImageBackground
            source={require("../../assets/home_img/talk.png")}
            style={styles.dialogBubble}
            imageStyle={{resizeMode: 'stretch'}}
          >
            <Text style={styles.dialogText}>{dialogMessages[dialogIndex]}</Text>
          </ImageBackground>
        )}

        {/* 记录按钮 */}
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => router.push("/record")}
        >
          <Image
            style={styles.fullSize}
            source={require("../../assets/home_img/record.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 精灵按钮 */}
        {webGLLoaded && (
          <TouchableOpacity
            style={styles.spriteButton}
            onPress={onDialogPress}
          >
            <Image
              source={require("../../assets/home_img/sprite.png")}
              style={styles.fullSize}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
  decorationPanel: {
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
  bottomButtonsContainer: {
    position: 'absolute',
    width: width,
    bottom: 1,
    left: 0,
    zIndex: 3,
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
  recordButton: {
    position: 'absolute',
    right: 20,
    bottom: -150,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  spriteButton: {
    position: 'absolute',
    left: 20,
    bottom: -150,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  fullSize: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default BottomContent; 
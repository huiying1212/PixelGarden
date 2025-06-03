import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 组件导入
import ModalTabs from "./components/ModalTabs";
import FriendModal from "./components/FriendModal";
import MessageModal from './components/MessageModal';
import PlantModal from './components/PlantModal';
import BackgroundWebView from './components/BackgroundWebView';

// HomeScreen 特定组件
import TopHeader from './components/home/TopHeader';
import BottomContent from './components/home/BottomContent';
import { useHomeScreenState } from './hooks/useHomeScreenState';
import { DIALOG_MESSAGES } from './components/home/constants';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const {
    state,
    actions,
    animations,
    handlers
  } = useHomeScreenState();

  const {
    showTaskModal,
    showFriendModal,
    showPlantModal,
    sunAmount,
    isMessageModalVisible,
    dialogIndex,
    showDialog,
    selectedIcons,
    webGLLoaded,
  } = state;

  const {
    setShowTaskModal,
    setShowFriendModal,
    setShowPlantModal,
    setMessageModalVisible,
    setWebGLLoaded,
  } = actions;

  const {
    decorationSlideAnim,
    iconsPositionAnim,
  } = animations;

  const {
    handleIconPress,
    handleDragRelease,
    updateSunAmount,
    toggleDecorations,
    handleDialogPress,
  } = handlers;

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* WebGL 页面作为背景 */}
      {/* day1 发芽形态 */}
      {/* <BackgroundWebView uri="https://seed-gamma.vercel.app/" onLoadComplete={(loaded) => setWebGLLoaded(loaded)}/> */}

      {/* day2 生长一阶段 */}
      {/* <BackgroundWebView uri="https://grow1-six.vercel.app/" onLoadComplete={(loaded) => setWebGLLoaded(loaded)}/> */}

      {/* day4 生长二阶段+晴天 */}
      {/* <BackgroundWebView uri="https://grow2-three.vercel.app/" onLoadComplete={(loaded) => setWebGLLoaded(loaded)}  /> */}

      {/* day5 生长二阶段 健康未达标+阴天 */}
      {/* <BackgroundWebView uri="https://grow2sad.vercel.app/" onLoadComplete={(loaded) => setWebGLLoaded(loaded)}/> */}

      {/* day7  */}
      <BackgroundWebView 
        uri="https://ai-garden-flax.vercel.app/" 
        onLoadComplete={(loaded) => setWebGLLoaded(loaded)}
      />

      <View style={styles.contentContainer}>
        <View style={styles.group_1}>
          <View style={styles.block_2}>
            {/* 留出时间信号栏的空间 */}
          </View>

          <TopHeader
            sunAmount={sunAmount}
            onSunPress={() => setShowPlantModal(true)}
            onTaskPress={() => setShowTaskModal(true)}
            onFriendPress={() => setShowFriendModal(true)}
            onDecorationPress={toggleDecorations}
          />

          <BottomContent
            webGLLoaded={webGLLoaded}
            showDialog={showDialog}
            dialogIndex={dialogIndex}
            dialogMessages={DIALOG_MESSAGES}
            showDecorations={state.showDecorations}
            decorationSlideAnim={decorationSlideAnim}
            iconsPositionAnim={iconsPositionAnim}
            selectedIcons={selectedIcons}
            onIconPress={handleIconPress}
            onDragRelease={handleDragRelease}
            onDialogPress={handleDialogPress}
            onMessagePress={() => setMessageModalVisible(true)}
          />
        </View>
      </View>

      {/* 各种模态框 */}
      <ModalTabs
        visible={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        updateSunAmount={updateSunAmount}
      />
      
      {showFriendModal && (
        <FriendModal visible={showFriendModal} onClose={() => setShowFriendModal(false)} />
      )}
      
      <MessageModal
        visible={isMessageModalVisible}
        onClose={() => setMessageModalVisible(false)}
      />
      
      <PlantModal
        visible={showPlantModal}
        onClose={() => setShowPlantModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1,
    top: 0,
    left: 0,
  },
  group_1: {
    position: 'relative',
    width: width,
    height: height * 0.78,
  },
  block_2: {
    width: width * 0.9,
    height: 18,
    marginTop: 25,
    marginLeft: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
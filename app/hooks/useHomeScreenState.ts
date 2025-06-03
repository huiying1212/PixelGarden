import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { HomeScreenState, HomeScreenActions } from '../components/home/types';
import { DIALOG_MESSAGES, ANIMATION_DURATION } from '../components/home/constants';
import { loadImagesWithErrorHandling } from '../components/home/ImagePreloader';

export const useHomeScreenState = () => {
  // 状态
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [sunAmount, setSunAmount] = useState(100);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  const [selectedIcons, setSelectedIcons] = useState(Array(8).fill(false));
  const [webGLLoaded, setWebGLLoaded] = useState(false);

  // 动画
  const decorationSlideAnim = useRef(new Animated.Value(0)).current;
  const iconsPositionAnim = useRef(new Animated.Value(0)).current;

  // 图片预加载效果
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await loadImagesWithErrorHandling();
      setImagesLoaded(loaded);
    };
    loadImages();
  }, []);

  // 事件处理函数
  const handleIconPress = (iconIndex: number) => {
    const newSelectedIcons = [...selectedIcons];
    newSelectedIcons[iconIndex] = !newSelectedIcons[iconIndex];
    setSelectedIcons(newSelectedIcons);
  };

  const handleDragRelease = (iconIndex: number, isDragged: boolean) => {
    if (isDragged && !selectedIcons[iconIndex]) {
      const newSelectedIcons = [...selectedIcons];
      newSelectedIcons[iconIndex] = true;
      setSelectedIcons(newSelectedIcons);
    }
  };

  const updateSunAmount = (amount: number) => {
    setSunAmount(prev => prev + amount);
  };

  const toggleDecorations = () => {
    const newValue = !showDecorations;
    setShowDecorations(newValue);
    Animated.parallel([
      Animated.timing(decorationSlideAnim, {
        toValue: newValue ? 1 : 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(iconsPositionAnim, {
        toValue: newValue ? 1 : 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleDialogPress = () => {
    setDialogIndex((prev) => (prev + 1) % DIALOG_MESSAGES.length);
    setShowDialog(true);
  };

  const state: HomeScreenState = {
    imagesLoaded,
    showTaskModal,
    showFriendModal,
    showDecorations,
    showPlantModal,
    sunAmount,
    isMessageModalVisible,
    dialogIndex,
    showDialog,
    selectedIcons,
    webGLLoaded,
  };

  const actions: HomeScreenActions = {
    setImagesLoaded,
    setShowTaskModal,
    setShowFriendModal,
    setShowDecorations,
    setShowPlantModal,
    setSunAmount,
    setMessageModalVisible,
    setDialogIndex,
    setShowDialog,
    setSelectedIcons,
    setWebGLLoaded,
  };

  return {
    state,
    actions,
    animations: {
      decorationSlideAnim,
      iconsPositionAnim,
    },
    handlers: {
      handleIconPress,
      handleDragRelease,
      updateSunAmount,
      toggleDecorations,
      handleDialogPress,
    },
  };
}; 
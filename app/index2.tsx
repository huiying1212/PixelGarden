import React, { useState, useEffect, useRef } from "react"; // Added useRef
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  PanResponder // Added PanResponder
} from "react-native";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalTabs from "./components/ModalTabs";
import FriendModal from "./components/FriendModal";
import { WebView } from 'react-native-webview';
import MessageModal from './components/MessageModal';

const { width, height } = Dimensions.get('window');

// 预加载所有图片资源
const preloadImages = async () => {
  const images = [
    require("../app/assets/home_img/Rectangle55.png"),
    require("../app/assets/home_img/1.png"),
    require("../app/assets/home_img/2.png"),
    require("../app/assets/home_img/3.png"),
    require("../app/assets/home_img/4.png"),
    require("../app/assets/home_img/5.png"),
    require("../app/assets/home_img/6.png"),
    require("../app/assets/home_img/7.png"),
    require("../app/assets/home_img/8.png"),
    require("../app/assets/home_img/unget.png"),
    require("../app/assets/home_img/unused.png"),
    require("../app/assets/home_img/used.png"),
    require("../app/assets/home_img/Rectangle45.png"),
    // Add other images if necessary
    require("../app/assets/home_img/FigmaDDSSlicePNG4d18dfe8145a98ae121d9b0d26ddcd2c.png"),
    require("../app/assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png"),
    require("../app/assets/home_img/friends.png"),
    require("../app/assets/home_img/decoration.png"),
    require("../app/assets/home_img/mailbox.png"),
    require("../app/assets/home_img/talk.png"),
    require("../app/assets/home_img/record.png"),
    require("../app/assets/home_img/sprite.png"),
  ];

  await Promise.all(images.map(image => Asset.fromModule(image).downloadAsync()));
};

const ICON_COUNT = 8;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  const decorationSlideAnim = useRef(new Animated.Value(0)).current; // Use useRef
  const iconsPositionAnim = useRef(new Animated.Value(0)).current; // Use useRef
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  const [selectedIcons, setSelectedIcons] = useState(Array(ICON_COUNT).fill(false));

  // --- Draggable Icons State ---
  const iconPositions = useRef(
    Array(ICON_COUNT).fill(null).map(() => new Animated.ValueXY())
  ).current;
  const panResponders = useRef([]).current;
  const [draggingIconIndex, setDraggingIconIndex] = useState(null); // To manage zIndex

  const dialogMessages = [
    "欢迎来到花园🌱",
    "点击我继续说话～",
    "小花很有精神，你的悉心照料让它茁壮成长！",
    "太棒了！因为有你，花园更加生机勃勃",
    "好久没来看我啦，我有点想你~",
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages();
        setImagesLoaded(true);
      } catch (error) {
        console.error("图片预加载失败:", error);
        setImagesLoaded(true);
      }
    };
    loadImages();

    // --- Initialize PanResponders ---
    iconPositions.forEach((pos, index) => {
      const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => {
          setDraggingIconIndex(index);
          pos.setOffset({
            x: pos.x._value,
            y: pos.y._value,
          });
          pos.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (_, gestureState) => {
           // Prevent dragging outside screen boundaries (optional)
          // Consider the parent's (block_5) animated position if you want truly absolute screen positioning
          // This example keeps dragging relative to where the icon starts its drag
          pos.setValue({x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: () => {
          pos.flattenOffset();
          setDraggingIconIndex(null);
          // Here you can add logic for snapping to a grid, or checking drop target
        },
      });
      panResponders[index] = panResponder;
    });

  }, []); // Empty dependency array means this runs once on mount


  const renderIcons = () => {
    const icons = [];
    const iconsPerRow = 4;
    const rows = Math.ceil(ICON_COUNT / iconsPerRow);

    const handleIconPress = (iconIndex) => { // This is for selection, not drag
      const newSelectedIcons = [...selectedIcons];
      newSelectedIcons[iconIndex] = !newSelectedIcons[iconIndex];
      setSelectedIcons(newSelectedIcons);
    };

    for (let i = 0; i < rows; i++) {
      const rowIcons = [];
      for (let j = 0; j < iconsPerRow; j++) {
        const iconIndex = i * iconsPerRow + j;
        if (iconIndex < ICON_COUNT) {
          let iconSource;
          switch (iconIndex) {
            case 0: iconSource = require("../app/assets/home_img/1.png"); break;
            case 1: iconSource = require("../app/assets/home_img/2.png"); break;
            case 2: iconSource = require("../app/assets/home_img/3.png"); break;
            case 3: iconSource = require("../app/assets/home_img/4.png"); break;
            case 4: iconSource = require("../app/assets/home_img/5.png"); break;
            case 5: iconSource = require("../app/assets/home_img/6.png"); break;
            case 6: iconSource = require("../app/assets/home_img/7.png"); break;
            case 7: iconSource = require("../app/assets/home_img/8.png"); break;
            default: iconSource = require("../app/assets/home_img/1.png");
          }

          // Ensure panResponder is initialized
          if (!panResponders[iconIndex]) {
            // Placeholder or skip rendering if panResponder not ready
             // This shouldn't happen if initialized in useEffect correctly
            rowIcons.push(<View key={`icon-placeholder-${iconIndex}`} style={styles.iconWithBaseContainer} />);
            continue;
          }

          rowIcons.push(
            <Animated.View
              key={`draggable-icon-${iconIndex}`}
              style={[
                // We don't use styles.iconWithBaseContainer directly on Animated.View for layout
                // Instead, the inner View handles that.
                // The Animated.View's position is controlled by transform.
                iconPositions[iconIndex].getLayout(), // Uses left/top for absolute positioning
                // Alternatively, for transform based positioning:
                // { transform: iconPositions[iconIndex].getTranslateTransform() },
                { zIndex: draggingIconIndex === iconIndex ? 99 : 1 } // Bring dragged item to front
              ]}
              {...panResponders[iconIndex].panHandlers}
            >
              {/* TouchableOpacity is now for selection, drag is handled by Animated.View */}
              <TouchableOpacity
                activeOpacity={0.8} // Allow touch to pass through for PanResponder if needed, or handle tap separately
                onPress={() => handleIconPress(iconIndex)} // Keep selection logic if desired
                style={styles.iconWithBaseContainer} // This provides the original size and layout for the icon itself
              >
                {iconIndex <= 5 && (
                  <Image
                    style={styles.iconBase}
                    source={selectedIcons[iconIndex]
                      ? require("../app/assets/home_img/used.png")
                      : require("../app/assets/home_img/unused.png")
                    }
                  />
                )}
                {(iconIndex === 6 || iconIndex === 7) && (
                  <Image
                    style={styles.iconBase}
                    source={require("../app/assets/home_img/unget.png")}
                  />
                )}
                <Image
                  style={styles.icon}
                  source={iconSource}
                />
              </TouchableOpacity>
            </Animated.View>
          );
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

  const toggleDecorations = () => {
    const newValue = !showDecorations;
    setShowDecorations(newValue);
    Animated.parallel([
      Animated.timing(decorationSlideAnim, {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: true, // Safe for transform and opacity
      }),
      Animated.timing(iconsPositionAnim, {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: true, // Safe for transform
      })
    ]).start();
  };

  if (!imagesLoaded) { // Optional: Show a loading indicator
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading assets...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <WebView
        source={{ uri: 'https://ai-garden-flax.vercel.app/' }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />

      <View style={styles.contentContainer}>
        <View style={styles.group_1}>
          <View style={[styles.block_2, {marginTop: insets.top > 0 ? insets.top : 25 }]}>
            {/* Status bar space */}
          </View>

          <View style={styles.imageWrapper_1}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                style={styles.label_1}
                source={require("../app/assets/home_img/FigmaDDSSlicePNG4d18dfe8145a98ae121d9b0d26ddcd2c.png")}
              />
            </TouchableOpacity>
            <View style={styles.verticalLabelsContainer}>
              <TouchableOpacity onPress={() => setShowTaskModal(true)}>
                <Image
                  style={styles.label_3}
                  source={require("../app/assets/home_img/FigmaDDSSlicePNG87c41bd798edc555eb194a583e39b1a3.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFriendModal(true)}>
                <Image
                  style={styles.label_4}
                  source={require("../app/assets/home_img/friends.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDecorations}>
                <Image
                  style={styles.label_5}
                  source={require("../app/assets/home_img/decoration.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.mailboxButton}
            onPress={() => setMessageModalVisible(true)}
          >
            <Image
              source={require("../app/assets/home_img/mailbox.png")}
              style={styles.mailboxIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Decoration Tray */}
          <Animated.View
            style={[
              styles.block_5, // This container slides
              {
                transform: [
                  {
                    translateY: decorationSlideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [250, 0], // Start off-screen or further down
                    }),
                  },
                ],
                opacity: decorationSlideAnim // Fade in/out
              }
            ]}
          >
            <Image
              style={styles.bottomImage} // Background for the tray
              source={require("../app/assets/home_img/Rectangle45.png")}
            />
            {/* Icons are rendered inside this animated view. Their drag positions are relative to their spot here initially. */}
            <View style={styles.iconsContainer}>
              {renderIcons()}
            </View>
          </Animated.View>

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
            {showDialog && (
              <ImageBackground
                source={require("../app/assets/home_img/talk.png")}
                style={styles.dialogBubble}
                imageStyle={{ resizeMode: 'stretch' }}
              >
                <Text style={styles.dialogText}>{dialogMessages[dialogIndex]}</Text>
              </ImageBackground>
            )}
            <TouchableOpacity
              style={styles.label_7}
              onPress={() => router.push("/record")}
            >
              <Image
                style={styles.fullSize}
                source={require("../app/assets/home_img/record.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newImage}
              onPress={() => {
                setDialogIndex((prev) => (prev + 1) % dialogMessages.length);
                setShowDialog(true);
              }}
            >
              <Image
                source={require("../app/assets/home_img/sprite.png")}
                style={styles.fullSize}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {showTaskModal && (
        <ModalTabs visible={showTaskModal} onClose={() => setShowTaskModal(false)} />
      )}
      {showFriendModal && (
        <FriendModal visible={showFriendModal} onClose={() => setShowFriendModal(false)} />
      )}
      <MessageModal
        visible={isMessageModalVisible}
        onClose={() => setMessageModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Changed to flex: 1 to ensure it covers the screen
    // position: 'absolute', // No longer needed if flex: 1
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: 'transparent', // Or your desired background for the whole app
    // margin: 0, // default
    // padding: 0, // default
    // overflow: 'hidden', // Can be problematic with absolutely positioned dragged items
  },
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Background
  },
  contentContainer: { // This will overlay the WebView
    flex: 1,
    // position: 'absolute', // No longer needed if parent is flex:1
    // width: width,
    // height: height,
    zIndex: 1, // Above WebView
    // top: 0, // default
    // left: 0, // default
  },
  group_1: { // This seems to be the main layout container for UI elements
    flex: 1, // Allow it to take up space
    position: 'relative', // For absolute positioning of children like block_5
    // width: width, // Not needed if flex: 1 and contentContainer is full
    // height: height * 0.78, // Be careful with fixed heights, might clip
  },
  block_2: { // Status bar spacer
    width: width * 0.9,
    height: 18, // This might need to be dynamic based on actual status bar height
    // marginTop: 25, // Replaced by insets.top
    marginLeft: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_1: {
    width: 54,
    height: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 15,
    letterSpacing: -0.33,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 15,
  },
  // ... (other styles for text_1 children - thumbnail_1, image_1, etc. - keep if used)
  imageWrapper_1: { // Container for profile icon and right-side action icons
    width: width * 0.9,
    // height: 70, // Let it be determined by content or set minHeight
    marginTop: 12,
    marginLeft: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the top
  },
  label_1: { // Profile icon
    width: 48,
    height: 48,
  },
  verticalLabelsContainer: { // Container for task, friend, decoration icons
    flexDirection: 'row',
    // justifyContent: 'flex-end', // Not needed if just aligning items
    alignItems: 'center', // Vertically align these icons
    height: 48, // Match profile icon height for alignment
  },
  // label_2 is not used, remove if confirmed
  label_3: { // Task icon
    width: 32,
    height: 32,
    marginRight: 15,
  },
  label_4: { // Friend icon
    width: 32,
    height: 32,
    marginRight: 15,
  },
  label_5: { // Decoration icon
    width: 32,
    height: 32,
  },
  block_5: { // Decoration tray container (Animated)
    // backgroundColor: 'transparent', // Already transparent by default
    // height: 40, // This will be determined by its content (iconsContainer + bottomImage)
    width: width,
    position: 'absolute', // Crucial for the slide animation & appearing over other content
    bottom: 0, // Initial animated position will override this, but good for base
    left: 0,
    zIndex: 10, // Ensure it's above the bottom buttons when shown
  },
  bottomImage: { // Background image for the decoration tray
    width: width,
    height: 180, // Adjust as needed to fit 2 rows of icons comfortably
    resizeMode: 'stretch', // Or 'cover' if you prefer
    position: 'absolute',
    bottom: 0, // At the very bottom of block_5
    left: 0,
  },
  iconsContainer: { // Holds the rows of draggable icons
    // position: 'absolute', // Not absolute within block_5, but part of its flow
    // top: 40, // Adjust this based on how much space you want above icons within the tray
    left: 0,
    width: width,
    zIndex: 1, // Icons should be above bottomImage
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // Space around the icon rows
    // This container will sit on top of 'bottomImage'
    // Adjust paddingBottom if 'bottomImage' has content that icons should not overlap
    paddingBottom: 20, // Example: to ensure icons are above the bottom edge of the tray image
  },
  iconRow: {
    width: '100%', // Take full width of iconsContainer
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribute icons evenly
    alignItems: 'center',
    marginVertical: 5, // Space between rows
  },
  iconWithBaseContainer: { // Wrapper for each icon's visual elements (base + actual icon)
    // This style is applied to the TouchableOpacity INSIDE the Animated.View
    position: 'relative', // For absolute positioning of iconBase and icon within this
    width: 60,  // Base width for touch target and layout
    height: 95, // Base height
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,0,0,0.2)', // For debugging layout
  },
  iconBase: { // The 'used.png', 'unused.png', 'unget.png'
    position: 'absolute',
    top: 0,
    left: 0, // Centering will be handled by parent
    width: '115%', // Slightly larger as per original
    height: '115%',
    resizeMode: 'contain',
    zIndex: 1, // Base is behind icon
  },
  icon: { // The actual '1.png', '2.png', etc.
    width: '65%', // Smaller, centered on base
    height: '65%',
    resizeMode: 'contain',
    zIndex: 2, // Icon is on top of base
    // position: 'absolute' is not needed if parent (iconWithBaseContainer) is using flex to center
  },
  // centerImage is not used, remove if confirmed
  // imageContainer, imageWrapper, image are generic, remove if not specifically used elsewhere

  bottomButtonsContainer: { // Container for record button and sprite (Animated)
    position: 'absolute',
    width: width,
    // height: 200, // Let it be determined by its children
    bottom: 1, // Adjust as needed
    left: 0,
    zIndex: 3, // Check against other absolute elements like mailbox and decoration tray
    // Ensure this is above the webview but potentially below the opened decoration tray
    // backgroundColor: 'rgba(0,0,255,0.1)', // For debugging
    alignItems: 'center', // For placing dialogBubble correctly if it's centered
  },
  mailboxButton: {
    position: 'absolute',
    right: width * 0.08,
    bottom: height * 0.08, // Adjust this relative to where bottomButtonsContainer sits
    width: 60,
    height: 60,
    zIndex: 5, // Ensure it's clickable
  },
  mailboxIcon: {
    width: '100%',
    height: '100%',
  },
  label_7: { // Record button
    position: 'absolute',
    right: 20,
    bottom: 20, // Position relative to bottomButtonsContainer
    width: 60,
    height: 60,
    // backgroundColor: 'transparent', // Default
    zIndex: 2, // Within bottomButtonsContainer
  },
  fullSize: { // Used by record and sprite images
    width: '100%',
    height: '100%',
    // position: 'absolute', // Not needed if parent TouchableOpacity handles layout
    // bottom: 0, // Not needed
  },
  newImage: { // Sprite button
    position: 'absolute',
    left: 20,
    bottom: 20, // Position relative to bottomButtonsContainer
    width: 100,
    height: 100,
    // backgroundColor: 'transparent', // Default
    zIndex: 2, // Within bottomButtonsContainer
  },
  // image_10 not used, remove if confirmed
  dialogBubble: {
    position: 'absolute', // Positioned relative to bottomButtonsContainer
    // left: 40, // If you want it aligned with the sprite, adjust based on newImage's position
    left: 20 + 100 / 2 - (width * 0.5) / 2, // Center above sprite approx
    bottom: 100 + 5, // Above the sprite
    width: width * 0.5,
    // aspectRatio: 3, // Let height be determined by content or set fixed height
    height: 60, // Example height
    zIndex: 5, // Above other buttons in this container
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Padding for text
  },
  dialogText: {
    fontSize: 14, // Adjusted for potentially smaller bubble
    color: '#333',
    textAlign: 'center',
    // marginHorizontal: 10, // Handled by bubble padding
    // marginVertical: 10,
    // marginTop: 1,
  },
});
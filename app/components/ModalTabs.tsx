import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import TaskScreen from "../TaskScreen";
import GalleryScreen from "../GalleryScreen";

interface ModalTabsProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalTabs({ visible, onClose }: ModalTabsProps) {
  const [activeTab, setActiveTab] = useState<"task" | "gallery">("task");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setIsReady(true), 10); // 等待 10ms 以确保布局完成
    } else {
      setIsReady(false);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {isReady && (
          <View style={styles.greenPopup}>
            {/* 标签栏 */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'task' ? styles.tabActiveLeft : styles.tabInactive]}
                onPress={() => setActiveTab('task')}
              >
                <Text style={activeTab === 'task' ? styles.tabTextActive : styles.tabTextInactive}>任务</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'gallery' ? styles.tabActiveRight : styles.tabInactive]}
                onPress={() => setActiveTab('gallery')}
              >
                <Text style={activeTab === 'gallery' ? styles.tabTextActive : styles.tabTextInactive}>图鉴</Text>
              </TouchableOpacity>
            </View>

            {/* 主内容区域 */}
      <View style={styles.contentArea}>
        {activeTab === "task" ? <TaskScreen /> : <GalleryScreen />}
      </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenPopup: {
    width: 300,
    height: 430,
    borderRadius: 0,
    backgroundColor: '#F0FFF0',
    padding: 16,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    width: 240,
    height: 38,
    backgroundColor: '#eaf6ea',
    borderRadius: 0,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabInactive: {
    backgroundColor: '#eaf6ea',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabActiveLeft: {
    backgroundColor: '#f8fff8',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#5a7d5a',
  },
  tabActiveRight: {
    backgroundColor: '#f8fff8',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#5a7d5a',
  },
  tabTextInactive: {
    color: '#b0b0b0',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#5a7d5a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  contentBackgroundImage: {
    // Add any necessary styles for the content background image
  },
}); 
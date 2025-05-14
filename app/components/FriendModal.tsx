import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Modal
} from 'react-native';

// 模拟好友数据
const friends = [
  { id: 1, name: '用户123', avatar: require('../assets/friend_img/avatar.png') },
  { id: 2, name: '用户123', avatar: require('../assets/friend_img/avatar.png') },
  { id: 3, name: '用户123', avatar: require('../assets/friend_img/avatar.png') },
];

// 模拟陌生人数据
const strangers = [
  { id: 4, name: '用户123', avatar: require('../assets/friend_img/avatar.png') },
];

interface FriendModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FriendModal({ visible, onClose }: FriendModalProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setIsReady(true), 10);
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
            {/* 搜索栏和时间排序 */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Text style={styles.searchText}>搜索或添加好友</Text>
              </View>
              <View style={styles.sortContainer}>
                <Text style={styles.sortText}>时间排序</Text>
                <Image
                  style={styles.sortIcon}
                  source={require('../assets/flowers/1.png')}
                />
              </View>
            </View>

            {/* 好友列表 */}
            <ScrollView style={styles.friendList}>
              {friends.map((friend) => (
                <View key={friend.id} style={styles.friendItem}>
                  <View style={styles.friendInfo}>
                    <Image
                      style={styles.avatar}
                      source={friend.avatar}
                    />
                    <Text style={styles.friendName}>{friend.name}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Image
                        style={styles.actionIcon}
                        source={require('../assets/friend_img/letter.png')}
                      />
                      <Text style={styles.actionText}>写信</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Image
                        style={styles.actionIcon}
                        source={require('../assets/friend_img/garden.png')}
                      />
                      <Text style={styles.actionText}>花园</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* 分隔线 */}
              <Text style={styles.divider}>——随机陌生人——</Text>

              {/* 陌生人列表 */}
              {strangers.map((stranger) => (
                <View key={stranger.id} style={styles.friendItem}>
                  <View style={styles.friendInfo}>
                    <Image
                      style={styles.avatar}
                      source={stranger.avatar}
                    />
                    <Text style={styles.friendName}>{stranger.name}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.addText}>添加</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Image
                        style={styles.actionIcon}
                        source={require('../assets/friend_img/letter.png')}
                      />
                      <Text style={styles.actionText}>写信</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Image
                        style={styles.actionIcon}
                        source={require('../assets/friend_img/garden.png')}
                      />
                      <Text style={styles.actionText}>花园</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* 关闭按钮 */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
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
    borderRadius: 5,
    backgroundColor: '#D6F1E4',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#FBFFF4',
    borderWidth: 1,
    borderColor: '#5a7d5a',
  },
  searchText: {
    fontSize: 16,
    color: '#5a7d5a',
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#D6F1E4',
  },
  sortText: {
    fontSize: 14,
    color: '#5a7d5a',
    marginRight: 4,
  },
  sortIcon: {
    width: 16,
    height: 16,
  },
  friendList: {
    flex: 1,
    width: 280,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 10,
    borderBottomColor: '#D6F1E4',
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  friendName: {
    fontSize: 16,
    color: '#5a7d5a',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 12,
    color: '#5a7d5a',
  },
  addText: {
    fontSize: 14,
    color: '#5a7d5a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#5a7d5a',
    borderRadius: 0,
  },
  divider: {
    textAlign: 'center',
    color: '#5a7d5a',
    fontSize: 14,
    paddingVertical: 5,
    backgroundColor: '#D6F1E4',
    width: '100%',
    marginTop: 2,
    marginBottom: 2,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#5a7d5a',
  },
}); 
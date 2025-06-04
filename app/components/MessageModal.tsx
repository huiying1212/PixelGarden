import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import DetailModal from './DetailModal';

const { width } = Dimensions.get('window');

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
}

const initialMessageData = [
  {
    name: '用户123',
    preview: '如果你看到这封信的时候，心情',
    avatar: require('../assets/letter/letter1.png'),
    type: 'letter1',
  },
  {
    name: '用户123',
    preview: '如果你看到这封信的时候，心情',
    avatar: require('../assets/letter/letter2.png'),
    type: 'letter2',
  },
  {
    name: '匿名用户',
    preview: '无',
    avatar: require('../assets/letter/letter2.png'),
    type: 'letter2',
  },
];

const MessageModal: React.FC<MessageModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState(initialMessageData);
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessageData[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ImageBackground 
            source={require('../assets/letter/letter3.png')}
            style={styles.container}
            resizeMode="cover"
          >
            <ScrollView style={styles.page}>
              <View style={styles.group1}>
                <View style={styles.header}>
                  <Text style={styles.title}>消息</Text>
                </View>
                <View style={styles.messageList}>
                  {messages.map((item, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.messageBox}
                      onPress={() => {
                        setSelectedMessage(item);
                        setSelectedIndex(index);
                      }}
                    >
                      <Image style={styles.avatar} source={item.avatar} />
                      <View style={styles.textGroup}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.preview}>{item.preview}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image 
              source={require('../assets/letter/close.png')} 
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {selectedMessage && (
        <DetailModal
          visible={!!selectedMessage}
          onClose={() => {
            setSelectedMessage(null);
            if (
              selectedIndex !== null &&
              messages[selectedIndex].type === 'letter1'
            ) {
              const newMessages = [...messages];
              newMessages[selectedIndex] = {
                ...newMessages[selectedIndex],
                type: 'letter2',
                avatar: require('../assets/letter/letter2.png'),
              };
              setMessages(newMessages);
            }
            setSelectedIndex(null);
          }}
          message={selectedMessage}
          isReplied={selectedMessage.type === 'letter2'}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    aspectRatio: 0.8,
    backgroundColor: 'transparent',
  },
  page: {
    flex: 1,
  },
  group1: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(237,200,150,0.3)',
  },
  title: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#624F3D',
    paddingLeft: 20,
  },
  messageList: {
    padding: 20,
    flex: 1,
    marginHorizontal: 20,
    marginTop: -30,
  },
  messageBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(254,253,239,0.84)',
    borderColor: 'rgba(237,200,150,1)',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  textGroup: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#624F3D',
    marginBottom: 2
  },
  preview: {
    fontSize: 12,
    color: 'rgba(98,79,61,0.6)',
  },
  closeButton: {
    marginTop: 1,
    padding: 5,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
});

export default MessageModal; 
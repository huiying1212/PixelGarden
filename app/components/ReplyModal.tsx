import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

const { width } = Dimensions.get('window');

interface ReplyModalProps {
  visible: boolean;
  onClose: () => void;
  message: {
    name: string;
    preview: string;
    avatar: any;
    type: string;
  };
}

const ReplyModal: React.FC<ReplyModalProps> = ({ visible, onClose, message }) => {
  const [text, setText] = useState('');
  const [giftMode, setGiftMode] = useState(false);
  const [giftCount, setGiftCount] = useState(1);

  const handleSend = () => {
    // 这里可以添加发送逻辑，比如传出 giftCount
    onClose();
  };

  const increaseGift = () => {
    setGiftCount(prev => Math.min(10, prev + 1));
  };

  const decreaseGift = () => {
    setGiftCount(prev => Math.max(1, prev - 1));
  };

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
            <TouchableOpacity onPress={onClose} style={styles.leftTopBackBtn}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
              keyboardVerticalOffset={0}
            >
              <View style={styles.innerBox}>
                <Text style={styles.nameCenter}>{`送给 · ${message.name}`}</Text>
                <Text style={styles.tipText}>写下你想说的话：</Text>
                <View style={{ width: width * 0.7, minHeight: 90, maxHeight: 120, marginBottom: 18, position: 'relative' }}>
                  <TextInput
                    style={styles.inputBox}
                    value={text}
                    onChangeText={setText}
                    placeholder="请输入回信内容..."
                    placeholderTextColor="#B0B0B0"
                    multiline={true}
                    maxLength={300}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      bottom: -50,
                      height: 36,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      zIndex: 2,
                    }}
                  >
                    {giftMode ? (
                      <>
                        <Image source={require('../assets/flowers/sun.png')} style={{ width: 28, height: 28, resizeMode: 'contain', marginRight: 6 }} />
                        <TouchableOpacity onPress={decreaseGift} style={{ marginHorizontal: 4 }}>
                          <Text style={{ fontSize: 20, color: '#624F3D' }}>−</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, width: 20, textAlign: 'center', color: '#624F3D' }}>{giftCount}</Text>
                        <TouchableOpacity onPress={increaseGift} style={{ marginHorizontal: 4 }}>
                          <Text style={{ fontSize: 20, color: '#624F3D' }}>＋</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity onPress={() => setGiftMode(true)}>
                        <Image source={require('../assets/letter/gift.png')} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                  <Text style={styles.sendBtnText}>发送</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
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
    justifyContent: 'flex-start',
    marginTop: -40,
  },
  innerBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 42,
    flex: 1,
  },
  nameCenter: {
    fontSize: 17,
    color: '#624F3D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 15,
    color: '#624F3D',
    marginBottom: 10,
    marginTop: 1,
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  inputBox: {
    width: width * 0.7,
    minHeight: 180,
    maxHeight: 180,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#EDC896',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#624F3D',
    marginBottom: 18,
    textAlignVertical: 'top',
  },
  sendBtn: {
    backgroundColor: '#FEFDEF',
    borderColor: '#EDC896',
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 55,
  },
  sendBtnText: {
    fontSize: 16,
    color: '#624F3D',
    fontWeight: 'bold',
  },
  leftTopBackBtn: {
    position: 'absolute',
    left: 40,
    top: 25,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    fontSize: 30,
    color: '#624F3D',
    fontWeight: 'bold',
  },
});

export default ReplyModal;

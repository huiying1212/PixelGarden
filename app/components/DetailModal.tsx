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
import ReplyModal from './ReplyModal';

const { width } = Dimensions.get('window');

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  message: {
    name: string;
    preview: string;
    avatar: any;
    type: string;
  };
}

const DetailModal: React.FC<DetailModalProps> = ({ visible, onClose, message }) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  // 判断是否为letter2
  const isLetter2 = message.avatar && message.avatar.toString().includes('letter2');
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
              <Image style={styles.returnIcon} source={require('../assets/profile_img/return.png')} />
            </TouchableOpacity>
            <ScrollView style={styles.page}>
              <View style={styles.innerBox}>
                <View style={styles.avatarNameRow}>
                  <Image style={styles.avatarCenter} source={require('../assets/profile_img/FigmaDDSSlicePNG11ebb597570fa9b9276201c68e1028fa.png')} />
                  <Text style={styles.nameCenter}>{message.name}</Text>
                </View>
                <Text style={styles.letterText}>
                如果你看到这封信的时候，心情刚好不太好，那我就借这一点点文字，把温柔和力量送给你。你一直都很棒，不需要太努力去证明自己。能走到今天的你，已经值得被好好拥抱了。
                </Text>
                <View style={styles.rewardBox}>
                  <Image style={styles.rewardIcon} source={require('../assets/letter/sun1.png')} />
                  <Text style={styles.rewardText}>获得 阳光x10</Text>
                </View>
                <TouchableOpacity style={styles.replyBtn} onPress={() => setShowReplyModal(true)}>
                  <Text style={styles.replyBtnText}>回信</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
      <ReplyModal
        visible={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        message={message}
      />
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
  page: {
    flex: 1,
    width: '100%',
  },
  innerBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
  },
  avatarNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 8,
  },
  avatarCenter: {
    width: 35,
    height: 35,
    borderRadius: 22,
    marginRight: 10,
    marginBottom: 3,
  },
  nameCenter: {
    fontSize: 17,
    color: '#624F3D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  letterText: {
    fontSize: 15,
    color: '#624F3D',
    textAlign: 'left',
    marginBottom: 18,
    lineHeight: 24,
    paddingHorizontal: 60,
  },
  rewardBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 1,
  },
  rewardIcon: {
    width: 45,
    height: 45,
    marginBottom: 0,
  },
  rewardText: {
    fontSize: 15,
    color: '#624F3D',
    textAlign: 'center',
  },
  replyBtn: {
    backgroundColor: '#FEFDEF',
    borderColor: '#EDC896',
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  replyBtnText: {
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
  returnIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default DetailModal; 
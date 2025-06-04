import React from 'react';
import { 
  Modal, 
  SafeAreaView, 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  StyleSheet 
} from 'react-native';

interface JournalInputModalProps {
  visible: boolean;
  content: string;
  onContentChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const JournalInputModal: React.FC<JournalInputModalProps> = ({
  visible,
  content,
  onContentChange,
  onCancel,
  onSave
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onCancel}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={styles.modalCancel} 
            onPress={onCancel}
          >
            <Text style={styles.modalCancelText}>取消</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>输入你的感受</Text>
          <TouchableOpacity 
            style={styles.modalDone} 
            onPress={onSave}
          >
            <Text style={styles.modalDoneText}>完成</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.modalInput}
          value={content}
          onChangeText={onContentChange}
          multiline={true}
          autoFocus={true}
          placeholder="今天的感受..."
          placeholderTextColor="#999"
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  modalCancel: {
    padding: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalDone: {
    padding: 8,
  },
  modalDoneText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  modalInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
});

export default JournalInputModal; 
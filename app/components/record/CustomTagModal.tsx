import React from 'react';
import { 
  Modal, 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  StyleSheet 
} from 'react-native';

interface CustomTagModalProps {
  visible: boolean;
  customTag: string;
  maxLength: number;
  onTagChange: (text: string) => void;
  onClose: () => void;
  onAdd: () => void;
}

const CustomTagModal: React.FC<CustomTagModalProps> = ({
  visible,
  customTag,
  maxLength,
  onTagChange,
  onClose,
  onAdd
}) => {
  const isAddButtonDisabled = customTag.trim() === '';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.tagModalOverlay}>
        <View style={styles.tagModalContainer}>
          <View style={styles.tagModalHeader}>
            <Text style={styles.tagModalTitle}>添加自定义标签</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.tagModalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.tagModalInput}
            value={customTag}
            onChangeText={onTagChange}
            placeholder="输入标签内容..."
            placeholderTextColor="#999"
            autoFocus={true}
            maxLength={maxLength}
          />
          <View style={styles.tagModalButtonContainer}>
            <TouchableOpacity 
              style={styles.tagModalButton}
              onPress={onAdd}
              disabled={isAddButtonDisabled}
            >
              <Text style={[
                styles.tagModalButtonText,
                isAddButtonDisabled && styles.tagModalButtonTextDisabled
              ]}>添加</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  tagModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tagModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(9, 62, 39)',
  },
  tagModalClose: {
    fontSize: 18,
    color: '#999',
    padding: 5,
  },
  tagModalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  tagModalButtonContainer: {
    alignItems: 'center',
  },
  tagModalButton: {
    backgroundColor: 'rgb(0, 118, 114)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  tagModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  tagModalButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CustomTagModal; 
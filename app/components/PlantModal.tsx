import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PlantModalProps {
  visible: boolean;
  onClose: () => void;
}

const COLORS = [
  '#FF4D4D', // 红
  '#FFA64D', // 橙
  '#FFD700', // 黄
  '#90EE90', // 浅绿
  '#40E0D0', // 青
  '#87CEEB', // 浅蓝
  '#9370DB', // 紫
  '#FFB6C1', // 粉
  '#FFFFFF', // 白
  '#2F4F4F'  // 深灰
];

const PlantModal: React.FC<PlantModalProps> = ({ visible, onClose }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // 改为数组存储多个选中的颜色
  const [plantName, setPlantName] = useState('');

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        // 如果颜色已经被选中，则移除
        return prev.filter(c => c !== color);
      } else {
        // 如果颜色未被选中，则添加
        return [...prev, color];
      }
    });
  };

  const handlePlant = () => {
    // TODO: 处理种植逻辑，现在可以使用 selectedColors 数组
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image 
            source={require('../assets/flowers/seed.png')}
            style={styles.seedImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>新的一周开始了！</Text>
          <Text style={styles.subtitle}>定制一颗种子，开启健康旅程吧</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>种类</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入"
              value={plantName}
              onChangeText={setPlantName}
              placeholderTextColor="rgba(0,0,0,0.3)"
            />
          </View>

          <View style={styles.colorSection}>
            <View style={styles.colorLabelRow}>
              <Text style={styles.colorLabel}>颜色</Text>
              <View style={styles.firstRowColors}>
                {COLORS.slice(0, 5).map((color, index) => (
                  <TouchableOpacity
                    key={`first-${index}`}
                    style={[
                      styles.colorBox,
                      { backgroundColor: color },
                      selectedColors.includes(color) && styles.selectedColor,
                      color === '#FFFFFF' && styles.whiteBox
                    ]}
                    onPress={() => handleColorToggle(color)}
                  >
                    {selectedColors.includes(color) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.secondRowColors}>
              {COLORS.slice(5, 10).map((color, index) => (
                <TouchableOpacity
                  key={`second-${index}`}
                  style={[
                    styles.colorBox,
                    { backgroundColor: color },
                    selectedColors.includes(color) && styles.selectedColor,
                    color === '#FFFFFF' && styles.whiteBox
                  ]}
                  onPress={() => handleColorToggle(color)}
                >
                  {selectedColors.includes(color) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.plantButton,
              selectedColors.length === 0 && styles.plantButtonDisabled
            ]} 
            onPress={handlePlant}
            disabled={selectedColors.length === 0}
          >
            <Text style={[
              styles.plantButtonText,
              selectedColors.length === 0 && styles.plantButtonTextDisabled
            ]}>播种</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: 260,
    height: 380,
    borderRadius: 5,
    backgroundColor: '#D6F1E4',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  seedImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093E27',
    marginBottom: 4,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#093E27',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#093E27',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#3C7B55',
  },
  colorSection: {
    width: '100%',
    marginBottom: 15,
  },
  colorLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 14,
    color: '#093E27',
    marginRight: 10,
    width: 30,
  },
  firstRowColors: {
    flexDirection: 'row',
    gap: 9,
  },
  secondRowColors: {
    flexDirection: 'row',
    gap: 9,
    paddingLeft: 39,
  },
  colorBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#3C7B55',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  plantButton: {
    backgroundColor: '#A1D5C6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 10,
  },
  plantButtonDisabled: {
    backgroundColor: '#D8E8E3',
  },
  plantButtonText: {
    color: '#093E27',
    fontSize: 16,
    fontWeight: 'bold',
  },
  plantButtonTextDisabled: {
    color: '#93B5A3',
  },
  closeButton: {
    marginTop: 12,
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

export default PlantModal;
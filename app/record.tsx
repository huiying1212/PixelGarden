'use client';

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Modal,
  SafeAreaView,
  StatusBar,
  BackHandler
} from 'react-native';
import { useRouter } from "expo-router";

// 导入图片资源
const moodImages = {
  excited: require('./assets/record_img/FigmaDDSSlicePNGe086683fd66eb3639cfb593f40d4409f.png'),
  angry: require('./assets/record_img/FigmaDDSSlicePNGafc7b47dc18aad7d4c63cbe536aa6060.png'),
  anxious: require('./assets/record_img/FigmaDDSSlicePNG3c29937ee304011592e8530456942d3f.png'),
  happy: require('./assets/record_img/FigmaDDSSlicePNGa399b738278ff61d7448f60818a5a16c.png'),
  calm: require('./assets/record_img/FigmaDDSSlicePNG95285abe5c05f93f141e601330f126c9.png'),
  sad: require('./assets/record_img/FigmaDDSSlicePNG95285abe5c05f93f141e601330f126c9.png'),
  back: require('./assets/record_img/FigmaDDSSlicePNG499f5b22226fc47697b61049ad618554.png'),
  photoButton: require('./assets/record_img/FigmaDDSSlicePNGa387ef4dd9bb0691ab714de9e246ec32.png'),
  voiceButton: require('./assets/record_img/FigmaDDSSlicePNG28b12381100a6f1822fb51540dde2755.png'),
  background: require('./assets/record_img/FigmaDDSSlicePNG2de87e7d36b33f8b8880081a4d05c6c5.png'),
};

const Record = () => {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState('happy');
  const [journalContent, setJournalContent] = useState('今天的工作很顺利，晚上还和朋友一起去吃了火锅，开心~');
  const [isInputModalVisible, setInputModalVisible] = useState(false);
  const [tempJournalContent, setTempJournalContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagModalVisible, setTagModalVisible] = useState(false);
  const [customTag, setCustomTag] = useState('');
  
  // 预设标签
  const presetTags = ['愉快', '放松', '有成就感', '凄凄惨惨', '感恩'];
  // 用户添加的自定义标签
  const [customTags, setCustomTags] = useState<string[]>([]);
  
  // 返回上一页
  const handleBack = () => {
    router.back();
  };
  
  // 获取当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    
    return `${year}年${month}月${day}日 ${weekday}`;
  };
  
  // 获取当前时间
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };
  
  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  // 处理标签选择
  const handleTagSelection = (tag: string) => {
    setSelectedTags(prevTags => {
      // 如果标签已选中，则移除
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } 
      // 否则添加标签
      else {
        return [...prevTags, tag];
      }
    });
  };

  // 打开添加标签模态框
  const openTagModal = () => {
    setCustomTag('');
    setTagModalVisible(true);
  };

  // 关闭添加标签模态框
  const closeTagModal = () => {
    setTagModalVisible(false);
  };

  // 添加自定义标签
  const addCustomTag = () => {
    if (customTag.trim() !== '') {
      const newTag = customTag.trim();
      // 避免添加重复标签
      if (!customTags.includes(newTag) && !presetTags.includes(newTag)) {
        setCustomTags(prevTags => [...prevTags, newTag]);
        // 自动选中新添加的标签
        setSelectedTags(prevTags => [...prevTags, newTag]);
      }
      setCustomTag('');
      setTagModalVisible(false);
    }
  };

  // 打开输入模态框
  const openInputModal = () => {
    setTempJournalContent(journalContent);
    setInputModalVisible(true);
  };

  // 保存输入内容并关闭模态框
  const saveAndCloseInputModal = () => {
    setJournalContent(tempJournalContent);
    setInputModalVisible(false);
  };

  // 取消并关闭模态框
  const cancelAndCloseInputModal = () => {
    setInputModalVisible(false);
  };
  
  // 保存按钮点击处理函数
  const handleSave = () => {
    Keyboard.dismiss();
    // 这里添加保存逻辑
    console.log('保存日记', {
      mood: selectedMood,
      content: journalContent,
      date: getCurrentDate(),
      tags: selectedTags
    });
  };
  
  // 沉浸式输入模态框
  const renderInputModal = () => {
    return (
      <Modal
        visible={isInputModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={cancelAndCloseInputModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCancel} 
              onPress={cancelAndCloseInputModal}
            >
              <Text style={styles.modalCancelText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>输入你的感受</Text>
            <TouchableOpacity 
              style={styles.modalDone} 
              onPress={saveAndCloseInputModal}
            >
              <Text style={styles.modalDoneText}>完成</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.modalInput}
            value={tempJournalContent}
            onChangeText={setTempJournalContent}
            multiline={true}
            autoFocus={true}
            placeholder="今天的感受..."
            placeholderTextColor="#999"
          />
        </SafeAreaView>
      </Modal>
    );
  };
  
  // 添加标签模态框
  const renderTagModal = () => {
    return (
      <Modal
        visible={isTagModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeTagModal}
      >
        <View style={styles.tagModalOverlay}>
          <View style={styles.tagModalContainer}>
            <View style={styles.tagModalHeader}>
              <Text style={styles.tagModalTitle}>添加自定义标签</Text>
              <TouchableOpacity onPress={closeTagModal}>
                <Text style={styles.tagModalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.tagModalInput}
              value={customTag}
              onChangeText={setCustomTag}
              placeholder="输入标签内容..."
              placeholderTextColor="#999"
              autoFocus={true}
              maxLength={10}
            />
            <View style={styles.tagModalButtonContainer}>
              <TouchableOpacity 
                style={styles.tagModalButton}
                onPress={addCustomTag}
                disabled={customTag.trim() === ''}
              >
                <Text style={[
                  styles.tagModalButtonText,
                  customTag.trim() === '' && styles.tagModalButtonTextDisabled
                ]}>添加</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          <ImageBackground 
            source={moodImages.background}
            style={styles.block1}
          >
            {/* 状态栏 */}
            <View style={styles.block2}>
                {/* 留出时间信号栏位置 */}
            </View>
            
            {/* 返回按钮 */}
            <View style={styles.imageWrapper1}>
              <TouchableOpacity onPress={handleBack}>
                <Image
                  style={styles.label1}
                  source={moodImages.back}
                />
              </TouchableOpacity>
            </View>
            
            {/* 标题部分 */}
            <Text style={styles.text2}>今天感觉如何？</Text>
            <Text style={styles.text3}>{getCurrentDate()}</Text>
            
            {/* 第一行情绪图标 */}
            <View style={styles.block3}>
              {/* 兴奋 */}
              <TouchableOpacity 
                style={[styles.moodCard, styles.moodCardFirst, selectedMood === 'excited' && styles.selected]}
                onPress={() => handleMoodSelection('excited')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.excited}
                  />
                </View>
                <Text style={styles.moodText}>兴奋</Text>
              </TouchableOpacity>
              
              {/* 愉悦 */}
              <TouchableOpacity 
                style={[styles.moodCard, selectedMood === 'happy' && styles.selected]}
                onPress={() => handleMoodSelection('happy')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.happy}
                  />
                </View>
                <Text style={styles.moodText}>愉悦</Text>
              </TouchableOpacity>
              
              {/* 平静 */}
              <TouchableOpacity 
                style={[styles.moodCard, selectedMood === 'calm' && styles.selected]}
                onPress={() => handleMoodSelection('calm')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.calm}
                  />
                </View>
                <Text style={styles.moodText}>平静</Text>
              </TouchableOpacity>
            </View>
            
            {/* 第二行情绪图标 */}
            <View style={styles.block4}>
              {/* 愤怒 */}
              <TouchableOpacity 
                style={[styles.moodCard, styles.moodCardFirst, selectedMood === 'angry' && styles.selected]}
                onPress={() => handleMoodSelection('angry')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.angry}
                  />
                </View>
                <Text style={styles.moodText}>愤怒</Text>
              </TouchableOpacity>
              
              {/* 焦虑 */}
              <TouchableOpacity 
                style={[styles.moodCard, selectedMood === 'anxious' && styles.selected]}
                onPress={() => handleMoodSelection('anxious')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.anxious}
                  />
                </View>
                <Text style={styles.moodText}>焦虑</Text>
              </TouchableOpacity>
              
              {/* 难过 */}
              <TouchableOpacity 
                style={[styles.moodCard, selectedMood === 'sad' && styles.selected]}
                onPress={() => handleMoodSelection('sad')}
              >
                <View style={styles.moodIconContainer}>
                  <Image
                    style={styles.moodIcon}
                    source={moodImages.sad}
                  />
                </View>
                <Text style={styles.moodText}>难过</Text>
              </TouchableOpacity>
            </View>
            
            {/* 情绪标签 - 第一行 */}
            <View style={styles.block8}>
              <TouchableOpacity 
                style={[styles.tagWrapper, selectedTags.includes('愉快') && styles.tagSelected]}
                onPress={() => handleTagSelection('愉快')}
              >
                <Text style={[styles.tagText, selectedTags.includes('愉快') && styles.tagTextSelected]}>愉快</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tagWrapper, selectedTags.includes('放松') && styles.tagSelected]}
                onPress={() => handleTagSelection('放松')}
              >
                <Text style={[styles.tagText, selectedTags.includes('放松') && styles.tagTextSelected]}>放松</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tagWrapper, selectedTags.includes('有成就感') && styles.tagSelected]}
                onPress={() => handleTagSelection('有成就感')}
              >
                <Text style={[styles.tagText, selectedTags.includes('有成就感') && styles.tagTextSelected]}>有成就感</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tagWrapper, selectedTags.includes('凄凄惨惨') && styles.tagSelected]}
                onPress={() => handleTagSelection('凄凄惨惨')}
              >
                <Text style={[styles.tagText, selectedTags.includes('凄凄惨惨') && styles.tagTextSelected]}>凄凄惨惨</Text>
              </TouchableOpacity>
            </View>
            
            {/* 情绪标签 - 第二行 */}
            <View style={styles.block9}>
              <TouchableOpacity 
                style={[styles.tagWrapper, selectedTags.includes('感恩') && styles.tagSelected]}
                onPress={() => handleTagSelection('感恩')}
              >
                <Text style={[styles.tagText, selectedTags.includes('感恩') && styles.tagTextSelected]}>感恩</Text>
              </TouchableOpacity>
              
              {/* 自定义标签 */}
              {customTags.map(tag => (
                <TouchableOpacity 
                  key={tag}
                  style={[styles.tagWrapper, selectedTags.includes(tag) && styles.tagSelected]}
                  onPress={() => handleTagSelection(tag)}
                >
                  <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
                </TouchableOpacity>
              ))}
              
              {/* 更多按钮 */}
              <TouchableOpacity 
                style={styles.tagWrapper}
                onPress={openTagModal}
              >
                <Text style={styles.tagText}>+ 更多</Text>
              </TouchableOpacity>
            </View>
            
            {/* 日记内容 */}
            <TouchableOpacity 
              style={styles.textWrapper7}
              onPress={openInputModal}
              activeOpacity={0.7}
            >
              <Text style={[styles.text14, journalContent ? {} : styles.placeholder]}>
                {journalContent || "点击这里输入今天的感受..."}
              </Text>
            </TouchableOpacity>
            
            {/* 底部按钮 */}
            <View style={styles.block10}>
              <TouchableOpacity>
                <Image
                  style={styles.label2}
                  source={moodImages.photoButton}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.label3}
                  source={moodImages.voiceButton}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.textWrapper8}
                onPress={handleSave}
              >
                <Text style={styles.text15}>保存</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {renderTagModal()}
          {renderInputModal()}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    backgroundColor: 'white',
    position: 'relative',
    width: 375,
    height: 812,
  },
  block1: {
    width: 645,
    height: 1102,
    marginTop: -11,
    marginLeft: -95,
  },
  block2: {
    width: 339,
    height: 18,
    marginTop: 25,
    marginLeft: 117,
    flexDirection: 'row',
  },
  text1: {
    width: 54,
    height: 18,
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 15,
  },
  thumbnail1: {
    width: 18,
    height: 12,
    marginTop: 3,
    marginLeft: 217,
  },
  image1: {
    width: 21,
    height: 15,
    marginTop: 2,
    marginLeft: 2,
  },
  image2: {
    width: 25,
    height: 12,
    marginTop: 3,
    marginLeft: 2,
  },
  imageWrapper1: {
    height: 49,
    width: 375,
    marginTop: 12,
    marginLeft: 95,
    flexDirection: 'column',
  },
  label1: {
    width: 25,
    height: 25,
    marginTop: 12,
    marginLeft: 14,
  },
  text2: {
    width: 126,
    height: 18,
    color: 'rgb(9, 62, 39)',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: -4,
    marginLeft: 220,
  },
  text3: {
    width: 200,
    height: 12,
    color: 'rgba(0, 118, 114, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 12,
    marginTop: 8,
    marginLeft: 183,
  },
  block3: {
    width: 333,
    height: 120,
    marginTop: 24,
    marginLeft: 116,
    flexDirection: 'row',
  },
  moodCard: {
    backgroundColor: 'rgba(161, 213, 198, 0.34)',
    borderRadius: 4,
    width: 100,
    height: 120,
    flexDirection: 'column',
    marginLeft: 16,
    alignItems: 'center',
  },
  moodCardFirst: {
    marginLeft: 0,
  },
  moodIconContainer: {
    width: 64,
    height: 76,
    marginTop: 8,
    flexDirection: 'column',
  },
  moodIcon: {
    width: 64,
    height: 76,
  },
  moodText: {
    width: 50,
    height: 14,
    color: 'rgb(59, 73, 63)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 12,
  },
  selected: {
    shadowColor: 'rgba(20, 96, 58, 0.33)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    backgroundColor: 'rgb(251, 255, 244)',
    borderWidth: 1,
    borderColor: 'rgb(60, 123, 85)',
  },
  block4: {
    width: 333,
    height: 120,
    marginTop: 16,
    marginLeft: 116,
    flexDirection: 'row',
  },
  block8: {
    width: 333,
    height: 32,
    marginTop: 24,
    marginLeft: 116,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  tagWrapper: {
    backgroundColor: 'rgba(161, 213, 198, 0.34)',
    borderRadius: 4,
    padding: 9,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'column',
  },
  tagSelected: {
    backgroundColor: 'rgb(0, 118, 114)',
  },
  tagText: {
    color: 'rgb(59, 73, 63)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 14,
  },
  tagTextSelected: {
    color: 'white',
  },
  block9: {
    width: 333,
    height: 32,
    marginTop: 16,
    marginLeft: 116,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  textWrapper7: {
    backgroundColor: 'rgb(246, 246, 246)',
    borderRadius: 5,
    height: 150,
    width: 333,
    marginTop: 24,
    marginLeft: 116,
    padding: 12,
    flexDirection: 'column',
  },
  text14: {
    flex: 1,
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 15,
    fontFamily: 'System',
    padding: 5,
  },
  placeholder: {
    color: '#999',
  },
  block10: {
    width: 333,
    height: 40,
    marginTop: 24,
    marginLeft: 116,
    flexDirection: 'row',
  },
  label2: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: 16,
  },
  label3: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: 16,
  },
  textWrapper8: {
    backgroundColor: 'rgb(0, 118, 114)',
    borderRadius: 5,
    width: 150,
    height: 40,
    marginLeft: 83,
    flexDirection: 'column',
  },
  text15: {
    width: 56,
    height: 40,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 40,
    alignSelf: 'center',
  },
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
  
  // 标签模态框样式
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

export default Record;

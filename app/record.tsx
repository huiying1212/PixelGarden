'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from "expo-router";
import { saveJournalEntry } from './services/journal.service';
import BackButton from './components/BackButton';
import { 
  MoodCard, 
  TagButton, 
  JournalInputModal, 
  CustomTagModal, 
  type MoodType, 
  type MoodOption 
} from './components/record';

// 常量定义
const CONSTANTS = {
  MAX_TAG_LENGTH: 10,
  PRESET_TAGS: ['愉快', '放松', '有成就感', '凄凄惨惨', '感恩'] as string[],
  WEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  PLACEHOLDER_TEXT: "今天发生了什么？来做个记录吧....",
  MESSAGES: {
    SUCCESS: '您的日记已成功保存！',
    ERROR: '保存失败，请稍后重试',
    GENERAL_ERROR: '保存过程中出错，请稍后重试'
  }
} as const;

// 导入图片资源
const moodImages = {
  excited: require('./assets/record_img/FigmaDDSSlicePNGe086683fd66eb3639cfb593f40d4409f.png'),
  angry: require('./assets/record_img/FigmaDDSSlicePNGafc7b47dc18aad7d4c63cbe536aa6060.png'),
  anxious: require('./assets/record_img/FigmaDDSSlicePNG3c29937ee304011592e8530456942d3f.png'),
  happy: require('./assets/record_img/FigmaDDSSlicePNGa399b738278ff61d7448f60818a5a16c.png'),
  calm: require('./assets/record_img/FigmaDDSSlicePNG95285abe5c05f93f141e601330f126c9.png'),
  sad: require('./assets/record_img/FigmaDDSSlicePNG95285abe5c05f93f141e601330f126c9.png'),
  back: require('./assets/img/backbutton.png'),
  photoButton: require('./assets/record_img/FigmaDDSSlicePNGa387ef4dd9bb0691ab714de9e246ec32.png'),
  voiceButton: require('./assets/record_img/FigmaDDSSlicePNG28b12381100a6f1822fb51540dde2755.png'),
  background: require('./assets/record_img/FigmaDDSSlicePNG2de87e7d36b33f8b8880081a4d05c6c5.png'),
} as const;

const Record: React.FC = () => {
  const router = useRouter();
  
  // 状态管理
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [journalContent, setJournalContent] = useState<string>('');
  const [isInputModalVisible, setInputModalVisible] = useState<boolean>(false);
  const [tempJournalContent, setTempJournalContent] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagModalVisible, setTagModalVisible] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<string>('');
  const [customTags, setCustomTags] = useState<string[]>([]);
  
  // 心情选项配置
  const moodOptions: MoodOption[] = useMemo(() => [
    { key: 'excited', label: '兴奋', image: moodImages.excited },
    { key: 'happy', label: '愉悦', image: moodImages.happy },
    { key: 'calm', label: '平静', image: moodImages.calm },
    { key: 'angry', label: '愤怒', image: moodImages.angry },
    { key: 'anxious', label: '焦虑', image: moodImages.anxious },
    { key: 'sad', label: '难过', image: moodImages.sad },
  ], []);
  
  // 获取当前日期
  const getCurrentDate = useCallback((): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = CONSTANTS.WEEKDAYS[now.getDay()];
    
    return `${year}年${month}月${day}日 ${weekday}`;
  }, []);
  
  // 事件处理函数
  const handleMoodSelection = useCallback((mood: MoodType) => {
    setSelectedMood(mood);
  }, []);

  const handleTagSelection = useCallback((tag: string) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  }, []);

  // 模态框控制
  const openTagModal = useCallback(() => {
    setCustomTag('');
    setTagModalVisible(true);
  }, []);

  const closeTagModal = useCallback(() => {
    setTagModalVisible(false);
  }, []);

  const openInputModal = useCallback(() => {
    setTempJournalContent(journalContent);
    setInputModalVisible(true);
  }, [journalContent]);

  const saveAndCloseInputModal = useCallback(() => {
    setJournalContent(tempJournalContent);
    setInputModalVisible(false);
  }, [tempJournalContent]);

  const cancelAndCloseInputModal = useCallback(() => {
    setInputModalVisible(false);
  }, []);

  // 添加自定义标签
  const addCustomTag = useCallback(() => {
    const trimmedTag = customTag.trim();
    if (trimmedTag && !customTags.includes(trimmedTag) && !CONSTANTS.PRESET_TAGS.includes(trimmedTag)) {
      setCustomTags(prevTags => [...prevTags, trimmedTag]);
      setSelectedTags(prevTags => [...prevTags, trimmedTag]);
      setCustomTag('');
      setTagModalVisible(false);
    }
  }, [customTag, customTags]);
  
  // 保存日记
  const handleSave = useCallback(async () => {
    Keyboard.dismiss();
    
    try {
      const { success, error } = await saveJournalEntry(selectedMood, journalContent, selectedTags);
      
      if (success) {
        Alert.alert('成功', CONSTANTS.MESSAGES.SUCCESS);
        router.back();
      } else {
        console.error('保存失败:', error);
        Alert.alert('错误', CONSTANTS.MESSAGES.ERROR);
      }
    } catch (error) {
      console.error('保存过程中出错:', error);
      Alert.alert('错误', CONSTANTS.MESSAGES.GENERAL_ERROR);
    }
  }, [selectedMood, journalContent, selectedTags, router]);
  
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
              <BackButton 
                imageSource={moodImages.back} 
                style={styles.backButtonStyle}
              />
            </View>
            
            {/* 标题部分 */}
            <Text style={styles.text2}>今天感觉如何？</Text>
            <Text style={styles.text3}>{getCurrentDate()}</Text>
            
            {/* 第一行情绪图标 */}
            <View style={styles.block3}>
              {moodOptions.slice(0, 3).map((mood, index) => (
                <MoodCard
                  key={mood.key}
                  mood={mood}
                  isSelected={selectedMood === mood.key}
                  isFirstInRow={index === 0}
                  onPress={handleMoodSelection}
                />
              ))}
            </View>
            
            {/* 第二行情绪图标 */}
            <View style={styles.block4}>
              {moodOptions.slice(3, 6).map((mood, index) => (
                <MoodCard
                  key={mood.key}
                  mood={mood}
                  isSelected={selectedMood === mood.key}
                  isFirstInRow={index === 0}
                  onPress={handleMoodSelection}
                />
              ))}
            </View>
            
            {/* 情绪标签 - 第一行 */}
            <View style={styles.block8}>
              {CONSTANTS.PRESET_TAGS.slice(0, 4).map(tag => (
                <TagButton
                  key={tag}
                  tag={tag}
                  isSelected={selectedTags.includes(tag)}
                  onPress={handleTagSelection}
                />
              ))}
            </View>
            
            {/* 情绪标签 - 第二行 */}
            <View style={styles.block9}>
              {/* 感恩标签 */}
              <TagButton
                tag={CONSTANTS.PRESET_TAGS[4]}
                isSelected={selectedTags.includes(CONSTANTS.PRESET_TAGS[4])}
                onPress={handleTagSelection}
              />
              
              {/* 自定义标签 */}
              {customTags.map(tag => (
                <TagButton
                  key={tag}
                  tag={tag}
                  isSelected={selectedTags.includes(tag)}
                  onPress={handleTagSelection}
                />
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
              <Text style={[styles.text14, !journalContent && styles.placeholder]}>
                {journalContent || CONSTANTS.PLACEHOLDER_TEXT}
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
          
          {/* 模态框 */}
          <CustomTagModal
            visible={isTagModalVisible}
            customTag={customTag}
            maxLength={CONSTANTS.MAX_TAG_LENGTH}
            onTagChange={setCustomTag}
            onClose={closeTagModal}
            onAdd={addCustomTag}
          />
          
          <JournalInputModal
            visible={isInputModalVisible}
            content={tempJournalContent}
            onContentChange={setTempJournalContent}
            onCancel={cancelAndCloseInputModal}
            onSave={saveAndCloseInputModal}
          />
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
  backButtonStyle: {
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
  tagText: {
    color: 'rgb(59, 73, 63)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 14,
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
});

export default Record;

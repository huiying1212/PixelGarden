import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  View, 
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native';
import { useProfile } from './hooks/useProfile';
import { DateUtils } from './utils/dateUtils';
import BackButton from './components/BackButton';
import ProfileHeader from './components/profile/ProfileHeader';
import WeekCalendar from './components/profile/WeekCalendar';
import GardenDisplay from './components/profile/GardenDisplay';
import StatsSection from './components/profile/StatsSection';
import JournalDisplay from './components/profile/JournalDisplay';

// 图片资源
const IMAGES = {
  background: require('../app/assets/profile_img/FigmaDDSSlicePNG0193b3eb53db29fe492771a60b01e010.png'),
  back: require('./assets/img/backbutton.png'),
};

export default function ProfileScreen() {
  const { 
    userInfo, 
    isLoading, 
    confirmLogout, 
    journalEntry,
    gardenSnapshot,
    physicalHealth,
    fetchGardenSnapshot, 
    fetchPhysicalHealthData, 
    fetchJournalEntryByDate,
    loadTodayData
  } = useProfile();
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  // 园龄天数 - 应该从API获取或计算
  const gardenDays = 56; // TODO: 从API获取用户的实际园龄

  // 处理日期点击
  const handleDateClick = async (index: number) => {
    const todayIndex = DateUtils.getTodayIndex();
    
    // 只允许点击今天和今天之前的日期
    if (index > todayIndex) {
      return;
    }
    
    setSelectedDate(index);
    
    // 如果点击的是今天，重新加载今天的数据
    if (index === todayIndex) {
      setIsDataLoading(true);
      try {
        await loadTodayData();
      } catch (error) {
        console.error("重新加载今天数据错误:", error);
      } finally {
        setIsDataLoading(false);
      }
      return;
    }
    
    // 其他日期需要单独加载
    setIsDataLoading(true);
    
    try {
      const fullDate = DateUtils.getDateByIndex(index);
      
      // 并行获取指定日期的数据
      await Promise.all([
        fetchGardenSnapshot(fullDate),
        fetchPhysicalHealthData(fullDate),
        fetchJournalEntryByDate(fullDate)
      ]);
    } catch (error) {
      console.error("获取数据错误:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // 初始化选中今天的日期
  useEffect(() => {
    const todayIndex = DateUtils.getTodayIndex();
    setSelectedDate(todayIndex);
    // 不需要调用handleDateClick，因为hook会自动加载今天的数据
  }, []);

  return (
    <ImageBackground 
      source={IMAGES.background}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.scrollView}>
        {/* 返回按钮 */}
        <View style={styles.header}>
          <BackButton 
            imageSource={IMAGES.back} 
            style={styles.backButtonStyle}
          />
        </View>
        
        {/* 用户信息头部 */}
        <ProfileHeader 
          userInfo={userInfo}
          gardenDays={gardenDays}
        />

        {/* 星期和日期选择 */}
        <WeekCalendar 
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />

        {/* 花园显示 */}
        <GardenDisplay 
          gardenSnapshot={gardenSnapshot}
          isLoading={isLoading}
          isDataLoading={isDataLoading}
        />

        {/* 健康数据统计 */}
        <StatsSection 
          physicalHealth={physicalHealth}
        />

        {/* 日记显示 */}
        <JournalDisplay 
          journalEntry={journalEntry}
        />
    
        {/* 退出登录按钮 */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={confirmLogout}
        >
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 50,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  backButtonStyle: {
    marginTop: 45,
    marginLeft: 3,
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(9, 62, 39, 0.1)',
    borderRadius: 20,
  },
  logoutText: {
    color: '#093E27',
    fontSize: 16,
  },
});

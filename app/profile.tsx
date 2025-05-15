import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  View, 
  Text, 
  Image, 
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { useProfile, PhysicalHealthData } from './hooks/useProfile';
import BackButton from './components/BackButton';

// 图片资源
const IMAGES = {
  avatar: require('../app/assets/profile_img/FigmaDDSSlicePNG11ebb597570fa9b9276201c68e1028fa.png'),
  activeDay: require('../app/assets/profile_img/FigmaDDSSlicePNGdfbb002210802394edf7d400f5a7c0de.png'),
  inactiveDay: require('../app/assets/profile_img/FigmaDDSSlicePNGca17798141ccd070aee1248aca5a0d46.png'),
  pendingDay: require('../app/assets/profile_img/FigmaDDSSlicePNG817515a7d625a46276a74a11d15c0bb4.png'),
  question: require('../app/assets/profile_img/question.png'),
  stepsIcon: require('../app/assets/profile_img/walk.png'),
  background: require('../app/assets/profile_img/FigmaDDSSlicePNG0193b3eb53db29fe492771a60b01e010.png'),
  back: require('./assets/img/backbutton.png'),
};

// 基础星期数组
const BASE_WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function ProfileScreen() {
  const { userInfo, isLoading, confirmLogout, journalEntry, fetchGardenSnapshot, 
          gardenSnapshot, fetchPhysicalHealthData, physicalHealth, fetchJournalEntryByDate } = useProfile();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [gardenImageSource, setGardenImageSource] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [currentPhysicalData, setCurrentPhysicalData] = useState<PhysicalHealthData>({
    steps: null, 
    calories: null, 
    sleep_duration: null
  });
  const [currentJournalEntry, setCurrentJournalEntry] = useState<string | null>(null);
  
  // 园龄天数 - 实际应用中应从API获取
  const gardenDays = 56;
  
  // 获取当前星期几并调整显示顺序
  const getWeekDays = () => {
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    const weekDays = [...BASE_WEEKDAYS];
    
    // 将"今天"放在正确的位置
    const adjustedWeekDays = weekDays.map((day, index) => {
      // 如果是今天，返回"今天"
      if (index === (today === 0 ? 6 : today - 1)) {
        return '今天';
      }
      return day;
    });
    
    return adjustedWeekDays;
  };
  
  const renderWeekDays = () => {
    const weekDays = getWeekDays();
    return weekDays.map((day, index) => (
      <Text 
        key={index} 
        style={[
          styles.weekdayText, 
          day === '今天' ? styles.todayText : styles.regularDayText
        ]}
      >
        {day}
      </Text>
    ));
  };

  // 获取日期数组
  const getDates = () => {
    const dates = [];
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    
    // 计算需要显示的日期
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      // 计算偏移量：如果今天是周二，我们需要显示周一到周日
      const offset = i - (today === 0 ? 6 : today - 1);
      date.setDate(date.getDate() + offset);
      dates.push(`${date.getMonth() + 1}-${date.getDate()}`);
    }
    
    return dates;
  };

  // 获取特定索引对应的完整日期字符串（年-月-日格式）
  const getFullDateByIndex = (index: number): string => {
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    
    // 计算选中日期与今天的偏移量
    const offset = index - (today === 0 ? 6 : today - 1);
    const selectedDate = new Date(now);
    selectedDate.setDate(selectedDate.getDate() + offset);
    
    // 打印详细的日期信息以便调试
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    console.log(`选择的日期索引: ${index}, 今天星期几: ${today}, 偏移量: ${offset}`);
    console.log(`计算出的完整日期: ${year}-${month}-${day}`);
    
    return selectedDate.toISOString();
  };

  // 处理日期点击
  const handleDateClick = async (index: number) => {
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    const todayIndex = today === 0 ? 6 : today - 1;
    
    console.log(`点击的索引: ${index}, 今天的索引: ${todayIndex}`);
    
    // 只允许点击今天和今天之前的日期
    if (index <= todayIndex) {
      setSelectedDate(index);
      setDebugInfo('加载中...');
      setGardenImageSource(null); // 先清空当前图片
      setCurrentPhysicalData({ steps: null, calories: null, sleep_duration: null }); // 清空健康数据
      setCurrentJournalEntry(null); // 清空日记内容
      
      // 获取选中日期的完整日期字符串
      const fullDate = getFullDateByIndex(index);
      
      try {
        // 并行获取所有数据
        const [snapshot, healthData, journalData] = await Promise.all([
          fetchGardenSnapshot(fullDate),
          fetchPhysicalHealthData(fullDate),
          fetchJournalEntryByDate(fullDate)
        ]);
        
        // 更新物理健康数据
        if (healthData) {
          setCurrentPhysicalData(healthData);
        }
        
        // 更新日记内容
        setCurrentJournalEntry(journalData);
        
        // 如果找到了快照，显示它；否则显示空白
        if (snapshot) {
          try {
            // 检查snapshot是否为有效URL
            if (typeof snapshot === 'string' && (
                snapshot.startsWith('http://') || 
                snapshot.startsWith('https://') || 
                snapshot.startsWith('data:image/')
              )) {
              setGardenImageSource({ uri: snapshot });
            } else {
              console.log(`无效的图片数据格式: ${typeof snapshot}`);
              setGardenImageSource(null); // 无效数据时显示空白
            }
          } catch (error) {
            console.error("设置图片来源失败:", error);
            setGardenImageSource(null); // 错误时显示空白
          }
        } else {
          console.log('没有找到对应日期的图片数据');
          setGardenImageSource(null); // 没有数据时显示空白
        }
      } catch (error) {
        console.error("获取数据错误:", error);
        setGardenImageSource(null); // 错误时显示空白
      }
    }
  };

  // 初始化选中今天的日期
  useEffect(() => {
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    const todayIndex = today === 0 ? 6 : today - 1;
    handleDateClick(todayIndex);
  }, []);

  // 当gardenSnapshot变化时更新图片
  useEffect(() => {
    if (gardenSnapshot) {
      try {
        setGardenImageSource({ uri: gardenSnapshot });
      } catch (error) {
        console.error("设置图片来源失败:", error);
        setGardenImageSource(null); // 错误时显示空白
      }
    } else {
      setGardenImageSource(null); // 没有数据时显示空白
    }
  }, [gardenSnapshot]);

  // 当physicalHealth变化时更新当前数据
  useEffect(() => {
    if (physicalHealth) {
      setCurrentPhysicalData(physicalHealth);
    }
  }, [physicalHealth]);

  // 当journalEntry变化时更新当前数据
  useEffect(() => {
    if (journalEntry !== null) {
      setCurrentJournalEntry(journalEntry);
    }
  }, [journalEntry]);

  const renderDayMarkers = () => {
    // 模拟7天的状态，最后一天是今天（活跃）
    const dayStatuses = [
      'inactive', 'inactive', 'active', 'active', 'question', 'question', 'question'
    ];
    // const dayStatuses = [
    //   'inactive', 'inactive', 'pending', 'pending', 'inactive', 'inactive', 'active'
    // ];


    const dates = getDates();
    const now = new Date();
    const today = now.getDay(); // 0是周日，1是周一，以此类推
    const todayIndex = today === 0 ? 6 : today - 1;

    return dayStatuses.map((status, index) => {
      let imageSource;
      const isToday = index === todayIndex;
      const isClickable = index <= todayIndex;
      
      switch(status) {
        case 'active':
          imageSource = IMAGES.activeDay;
          break;
        case 'inactive':
          imageSource = IMAGES.inactiveDay;
          break;
        case 'pending':
          imageSource = IMAGES.pendingDay;
          break;
        case 'question':
          imageSource = IMAGES.question;
          break;
      }
      
      return (
        <TouchableOpacity 
          key={index} 
          style={styles.markerColumn}
          onPress={() => handleDateClick(index)}
          disabled={!isClickable}
        >
          <View style={[
            styles.dayMarkerContainer,
            // 如果是今天,且被选中或是初始状态(selectedDate为null),显示白色背景和绿色边框
            (isToday && (selectedDate === index || selectedDate === null)) && styles.todayMarkerContainer,
            // 如果是今天,但其他日期被选中,只显示绿色边框
            isToday && selectedDate !== index && selectedDate !== null && styles.todayBorderOnly,
            // 如果是选中的非今天日期,显示白色背景和绿色边框
            !isToday && selectedDate === index && styles.todayMarkerContainer
          ]}>
            <View style={styles.dayMarkerInner}>
              <Image 
                source={imageSource} 
                style={status === 'question' ? { width: 28, height: 28 } : styles.dayMarker}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.dateLabel}>{dates[index]}</Text>
        </TouchableOpacity>
      );
    });
  };

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
        
        <View style={styles.profileSection}>
          <Image source={IMAGES.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userInfo?.name || '名字'}</Text>
            <Text style={styles.gardenDays}>已耕耘花园：{gardenDays}天</Text>
          </View>
        </View>

        <View style={styles.weekdaySection}>
          {renderWeekDays()}
        </View>

        <View style={styles.dayMarkersSection}>
          {renderDayMarkers()}
        </View>

        <View style={styles.healthSection}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3C7B55" />
              <Text style={styles.loadingText}>正在加载花园数据...</Text>
            </View>
          ) : (
            <>
              {gardenImageSource ? (
                <Image 
                  source={gardenImageSource} 
                  style={styles.activityIcon}
                  resizeMode="cover" 
                />
              ) : (
                <View style={styles.emptyGardenContainer}>
                  <Text style={styles.emptyGardenText}>暂无花园图片</Text>
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statBlock}>
            <View style={styles.statRow}>
              <Image 
                source={IMAGES.stepsIcon} 
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={[styles.statTitle, { color: '#009688' }]}>步数</Text>
            </View>
            <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">
              {currentPhysicalData?.steps ? (
                <>
                  <Text>{currentPhysicalData.steps}</Text>
                  <Text style={styles.statUnit}>步</Text>
                </>
              ) : (
                <Text style={styles.statNoData}>暂无数据</Text>
              )}
            </Text>
          </View>
          <View style={styles.statBlock}>
            <View style={styles.statRow}>
              <Image 
                source={require('../app/assets/profile_img/fire.png')} 
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={[styles.statTitle, { color: '#F44336' }]}>卡路里</Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {currentPhysicalData?.calories ? (
                <>
                  <Text style={styles.statValue}>{currentPhysicalData.calories}</Text>
                  <Text style={styles.statUnit}>千卡</Text>
                </>
              ) : (
                <Text style={styles.statNoData}>暂无数据</Text>
              )}
            </Text>
          </View>
          <View style={styles.statBlock}>
            <View style={styles.statRow}>
              <Image 
                source={require('../app/assets/profile_img/moon.png')} 
                style={[styles.statIcon, {tintColor: '#00B8F6'}]}
                resizeMode="contain"
              />
              <Text style={[styles.statTitle, { color: '#00B8F6' }]}>睡眠时长</Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {currentPhysicalData?.sleep_duration ? (
                <>
                  <Text style={styles.statValue}>{currentPhysicalData.sleep_duration}</Text>
                  <Text style={styles.statUnit}>小时</Text>
                </>
              ) : (
                <Text style={styles.statNoData}>暂无数据</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.moodSectionBox}>
          {currentJournalEntry ? (
            <Text style={styles.moodText}>{currentJournalEntry}</Text>
          ) : (
            <Text style={styles.emptyMoodText}>该日没有日记记录~</Text>
          )}
        </View>
    
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
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    color: '#093E27',
    fontWeight: '400',
    lineHeight: 18,
  },
  gardenDays: {
    fontSize: 12,
    color: 'rgba(0, 118, 114, 0.8)',
    marginTop: 8,
    lineHeight: 12,
  },
  weekdaySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28,
    marginTop: 32,
  },
  weekdayText: {
    fontSize: 13,
    textAlign: 'center',
    width: 24,
  },
  regularDayText: {
    color: 'rgba(0, 118, 114, 0.6)',
  },
  todayText: {
    color: '#093E27',
  },
  dayMarkersSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 4,
  },
  markerColumn: {
    alignItems: 'center',
  },
  dayMarkerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(161, 213, 198, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  todayMarkerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3C7B55',
  },
  todayBorderOnly: {
    backgroundColor: 'rgba(161, 213, 198, 0.34)',
    borderWidth: 2,
    borderColor: '#3C7B55',
  },
  dayMarkerInner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayMarker: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  dateLabel: {
    marginTop: 4,
    fontSize: 10,
    color: '#093E27',
  },
  healthSection: {
    height: 200,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderColor: '#3C7B55',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  activityIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  statBlock: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 13,
    color: '#093E27',
    fontWeight: 'bold',
    marginTop: 2,
    paddingLeft: 8,
  },
  statValueSub: {
    fontSize: 13,
    color: '#093E27',
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 13,
    color: '#093E27',
    fontWeight: 'bold',
  },
  moodSectionBox: {
    backgroundColor: '#fff',
    borderColor: '#3C7B55',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#3C7B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  moodSection: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  moodText: {
    color: '#093E27',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyMoodText: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 20,
  },
  moodImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginTop: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  loadingText: {
    color: '#093E27',
    fontSize: 16,
    marginTop: 10,
  },
  emptyGardenContainer: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  emptyGardenText: {
    color: '#093E27',
    fontSize: 16,
    opacity: 0.7,
  },
  statNoData: {
    color: '#AAAAAA',
    fontSize: 13,
    fontStyle: 'italic',
  },
});

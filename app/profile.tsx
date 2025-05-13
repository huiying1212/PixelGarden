import { 
  StyleSheet, 
  StatusBar, 
  View, 
  Text, 
  Image, 
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { useProfile } from './hooks/useProfile';

// 图片资源
const IMAGES = {
  avatar: require('../app/assets/profile_img/FigmaDDSSlicePNG11ebb597570fa9b9276201c68e1028fa.png'),
  backButton: require('../app/assets/profile_img/FigmaDDSSlicePNG499f5b22226fc47697b61049ad618554.png'),
  activeDay: require('../app/assets/profile_img/FigmaDDSSlicePNGdfbb002210802394edf7d400f5a7c0de.png'),
  inactiveDay: require('../app/assets/profile_img/FigmaDDSSlicePNGca17798141ccd070aee1248aca5a0d46.png'),
  pendingDay: require('../app/assets/profile_img/FigmaDDSSlicePNG817515a7d625a46276a74a11d15c0bb4.png'),
  activityIcon: require('../app/assets/profile_img/FigmaDDSSlicePNG3c3cb50fa104e9534e95ed7709262f52.png'),
  stepsIcon: require('../app/assets/profile_img/FigmaDDSSlicePNGd5176c4059ba46a35a5982e106f2ffaa.png'),
  background: require('../app/assets/profile_img/FigmaDDSSlicePNG0193b3eb53db29fe492771a60b01e010.png'),
};

const WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '今天'];

export default function ProfileScreen() {
  const { userInfo, isLoading, confirmLogout } = useProfile();
  
  // 园龄天数 - 实际应用中应从API获取
  const gardenDays = 56;
  
  const renderWeekDays = () => {
    return WEEKDAYS.map((day, index) => (
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

  const renderDayMarkers = () => {
    // 模拟7天的状态，最后一天是今天（活跃）
    const dayStatuses = [
      'inactive', 'inactive', 'pending', 'pending', 'inactive', 'inactive', 'active'
    ];

    // 获取日期数组
    const getDates = () => {
      const dates = [];
      const now = new Date();
      
      // 获取前6天的日期
      for (let i = 6; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        dates.push(`${date.getMonth() + 1}-${date.getDate()}`);
      }
      
      // 添加今天的日期
      dates.push(`${now.getMonth() + 1}-${now.getDate()}`);
      
      return dates;
    };

    const dates = getDates();

    return dayStatuses.map((status, index) => {
      let imageSource;
      let containerStyle = styles.dayMarkerContainer;
      
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
      }
      
      return (
        <View key={index} style={styles.markerColumn}>
          <View style={containerStyle}>
            <Image source={imageSource} style={styles.dayMarker} />
          </View>
          <Text style={styles.dateLabel}>{dates[index]}</Text>
        </View>
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Image source={IMAGES.backButton} style={styles.backButtonImage} />
          </TouchableOpacity>
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
          <Image 
            source={IMAGES.activityIcon} 
            style={styles.activityIcon}
            resizeMode="contain" 
          />
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Image source={IMAGES.stepsIcon} style={styles.statIcon} />
            <Text style={styles.statText}>12345步</Text>
          </View>
          <View style={styles.statDivider} />
          <Text style={styles.statText}>24分</Text>
          <View style={styles.statDivider} />
          <Text style={styles.statText}>7.5小时</Text>
        </View>

        <View style={styles.moodSection}>
          <Text style={styles.moodText}>今天的工作很顺利，晚上还和朋友一起去吃了火锅，开心~</Text>
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
    justifyContent: 'center',
    marginTop: 20,
  },
  backButton: {
    width: 25,
    height: 25,
  },
  backButtonImage: {
    width: 25,
    height: 25,
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
  },
  dayMarker: {
    width: 44,
    height: 44,
  },
  dateLabel: {
    marginTop: 4,
    fontSize: 10,
    color: '#093E27',
  },
  healthSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    height: 200,
  },
  activityIcon: {
    width: '70%',
    height: 180,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  statText: {
    color: '#093E27',
    fontSize: 16,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(9, 62, 39, 0.2)',
    marginHorizontal: 15,
  },
  moodSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  moodText: {
    color: '#093E27',
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
});

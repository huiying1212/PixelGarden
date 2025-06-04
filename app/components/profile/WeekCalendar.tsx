import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DateUtils } from '../../utils/dateUtils';

interface WeekCalendarProps {
  selectedDate: number | null;
  onDateClick: (index: number) => void;
}

// 图片资源
const IMAGES = {
  activeDay: require('../../assets/profile_img/FigmaDDSSlicePNGdfbb002210802394edf7d400f5a7c0de.png'),
  inactiveDay: require('../../assets/profile_img/FigmaDDSSlicePNGca17798141ccd070aee1248aca5a0d46.png'),
  pendingDay: require('../../assets/profile_img/FigmaDDSSlicePNG817515a7d625a46276a74a11d15c0bb4.png'),
  question: require('../../assets/profile_img/question.png'),
};

export default function WeekCalendar({ selectedDate, onDateClick }: WeekCalendarProps) {
  const renderWeekDays = () => {
    const weekDays = DateUtils.getWeekDays();
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

  const renderDayMarkers = () => {
    // 模拟7天的状态
    const dayStatuses = [
      'inactive', 'inactive', 'active', 'active', 'question', 'question', 'question'
    ];

    const dates = DateUtils.getDisplayDates();
    const todayIndex = DateUtils.getTodayIndex();

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
          onPress={() => onDateClick(index)}
          disabled={!isClickable}
        >
          <View style={[
            styles.dayMarkerContainer,
            (isToday && (selectedDate === index || selectedDate === null)) && styles.todayMarkerContainer,
            isToday && selectedDate !== index && selectedDate !== null && styles.todayBorderOnly,
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
    <>
      <View style={styles.weekdaySection}>
        {renderWeekDays()}
      </View>

      <View style={styles.dayMarkersSection}>
        {renderDayMarkers()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
}); 
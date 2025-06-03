import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PhysicalHealthData } from '../../hooks/useProfile';

interface StatsSectionProps {
  physicalHealth: PhysicalHealthData | null;
}

interface StatBlockProps {
  iconSource: any;
  title: string;
  value: number | null;
  unit: string;
  color: string;
  iconStyle?: any;
}

const StatBlock = ({ iconSource, title, value, unit, color, iconStyle }: StatBlockProps) => (
  <View style={styles.statBlock}>
    <View style={styles.statRow}>
      <Image 
        source={iconSource} 
        style={[styles.statIcon, iconStyle]}
        resizeMode="contain"
      />
      <Text style={[styles.statTitle, { color }]}>{title}</Text>
    </View>
    <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">
      {value ? (
        <>
          <Text>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
        </>
      ) : (
        <Text style={styles.statNoData}>暂无数据</Text>
      )}
    </Text>
  </View>
);

export default function StatsSection({ physicalHealth }: StatsSectionProps) {
  return (
    <View style={styles.statsSection}>
      <StatBlock
        iconSource={require('../../assets/profile_img/walk.png')}
        title="步数"
        value={physicalHealth?.steps || null}
        unit="步"
        color="#009688"
      />
      <StatBlock
        iconSource={require('../../assets/profile_img/fire.png')}
        title="卡路里"
        value={physicalHealth?.calories || null}
        unit="千卡"
        color="#F44336"
      />
      <StatBlock
        iconSource={require('../../assets/profile_img/moon.png')}
        title="睡眠时长"
        value={physicalHealth?.sleep_duration || null}
        unit="小时"
        color="#00B8F6"
        iconStyle={{ tintColor: '#00B8F6' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  statUnit: {
    fontSize: 13,
    color: '#093E27',
    fontWeight: 'bold',
  },
  statNoData: {
    color: '#AAAAAA',
    fontSize: 13,
    fontStyle: 'italic',
  },
}); 
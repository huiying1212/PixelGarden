import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UserInfo } from '../../hooks/useProfile';

interface ProfileHeaderProps {
  userInfo: UserInfo | null;
  gardenDays: number;
}

export default function ProfileHeader({ userInfo, gardenDays }: ProfileHeaderProps) {
  return (
    <View style={styles.profileSection}>
      <Image 
        source={require('../../assets/profile_img/FigmaDDSSlicePNG11ebb597570fa9b9276201c68e1028fa.png')} 
        style={styles.avatar} 
      />
      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{userInfo?.name || '名字'}</Text>
        <Text style={styles.gardenDays}>已耕耘花园：{gardenDays}天</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
}); 
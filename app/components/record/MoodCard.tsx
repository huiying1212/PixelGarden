import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

export type MoodType = 'excited' | 'happy' | 'calm' | 'angry' | 'anxious' | 'sad';

export interface MoodOption {
  key: MoodType;
  label: string;
  image: any;
}

interface MoodCardProps {
  mood: MoodOption;
  isSelected: boolean;
  isFirstInRow: boolean;
  onPress: (mood: MoodType) => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, isSelected, isFirstInRow, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.moodCard, 
        isFirstInRow && styles.moodCardFirst, 
        isSelected && styles.selected
      ]}
      onPress={() => onPress(mood.key)}
    >
      <View style={styles.moodIconContainer}>
        <Image style={styles.moodIcon} source={mood.image} />
      </View>
      <Text style={styles.moodText}>{mood.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default MoodCard; 
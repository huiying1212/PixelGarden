import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JournalDisplayProps {
  journalEntry: string | null;
}

export default function JournalDisplay({ journalEntry }: JournalDisplayProps) {
  return (
    <View style={styles.moodSectionBox}>
      {journalEntry ? (
        <Text style={styles.moodText}>{journalEntry}</Text>
      ) : (
        <Text style={styles.emptyMoodText}>该日没有日记记录~</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
}); 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onPress: (tag: string) => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.tagWrapper, isSelected && styles.tagSelected]}
      onPress={() => onPress(tag)}
    >
      <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
        {tag}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default TagButton; 
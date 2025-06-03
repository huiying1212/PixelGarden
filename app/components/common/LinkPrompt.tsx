import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { createSharedStyles } from './constants';

const { width, height } = Dimensions.get('window');
const sharedStyles = createSharedStyles(width, height);

interface LinkPromptProps {
  promptText: string;
  linkText: string;
  onLinkPress: () => void;
}

const LinkPrompt: React.FC<LinkPromptProps> = ({
  promptText,
  linkText,
  onLinkPress,
}) => (
  <View style={sharedStyles.linkPrompt}>
    <Text style={sharedStyles.promptText}>{promptText}</Text>
    <TouchableOpacity onPress={onLinkPress}>
      <Text style={sharedStyles.linkText}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

export default LinkPrompt; 
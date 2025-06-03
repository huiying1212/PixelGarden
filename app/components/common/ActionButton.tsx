import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SHARED_CONSTANTS, createSharedStyles } from './constants';

const { width, height } = Dimensions.get('window');
const sharedStyles = createSharedStyles(width, height);

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled = false,
}) => (
  <TouchableOpacity
    style={sharedStyles.actionButton}
    onPress={onPress}
    disabled={isLoading || disabled}
  >
    {isLoading ? (
      <ActivityIndicator color={SHARED_CONSTANTS.COLORS.PRIMARY_GREEN} size="small" />
    ) : (
      <Text style={sharedStyles.actionButtonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default ActionButton; 
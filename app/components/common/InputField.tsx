import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageSourcePropType,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { SHARED_CONSTANTS, createSharedStyles } from './constants';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const sharedStyles = createSharedStyles(width, height);

interface InputFieldProps {
  icon: ImageSourcePropType;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  isLoading: boolean;
  isOptional?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onValidate?: (text: string) => void;
  containerStyle?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  isLoading,
  isOptional = false,
  hasError = false,
  errorMessage = '',
  onValidate,
  containerStyle,
}) => (
  <View style={styles.inputFieldContainer}>
    <View
      style={[
        sharedStyles.inputContainer,
        hasError && sharedStyles.errorInputContainer,
        isOptional && sharedStyles.optionalInputContainer,
        containerStyle,
      ]}
    >
      <View style={sharedStyles.inputContent}>
        <Image style={sharedStyles.inputIcon} source={icon} />
        <TextInput
          style={sharedStyles.textInput}
          placeholder={placeholder}
          placeholderTextColor={
            isOptional
              ? SHARED_CONSTANTS.COLORS.OPTIONAL_GRAY
              : SHARED_CONSTANTS.COLORS.PLACEHOLDER_GREEN
          }
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            onValidate && onValidate(text);
          }}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!isLoading}
          maxLength={SHARED_CONSTANTS.MAX_INPUT_LENGTH}
        />
      </View>
    </View>
    {hasError && errorMessage ? (
      <Text style={sharedStyles.errorText}>{errorMessage}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  inputFieldContainer: {
    marginBottom: 15,
  },
});

export default InputField; 
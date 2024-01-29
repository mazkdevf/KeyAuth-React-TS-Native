import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import EyeOpen from '../icons/EyeOpen';
import EyeClose from '../icons/EyeClose';
import CustomText from './CustomText';

import { TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  placeholder: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ containerStyle, placeholder, onChangeText, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      animatedLabel(0);
    }
  };

  const handleTextChange = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      animatedLabel(1);
    } else {
      animatedLabel(isFocused ? 1 : 0);
    }
  };

  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 0],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['gray', '#888'],
    }),
  };

  return (
    <View style={containerStyle}>
      <View style={[styles.innerContainer]}>
        <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text}
            textAlignVertical="center"
            textContentType={props.secureTextEntry ? 'newPassword' : 'none'}
            secureTextEntry={showPassword}
          />
          {props.secureTextEntry && !!text && (
            <View>
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? <EyeOpen /> : <EyeClose />}
              </Pressable>
            </View>
          )}
        </View>
      </View>
      {error && <CustomText title={error} style={styles.errorText} />}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    height: 60,
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
    color: '#fff',
    // outlineStyle: 'none' // error from mobile
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: 'red',
  },
});

export default CustomInput;

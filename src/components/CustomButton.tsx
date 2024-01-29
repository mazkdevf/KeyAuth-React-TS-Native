import React from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";
import { styles } from "../../styles";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, loading = false }) => {
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress} >
      {loading ? 
        <ActivityIndicator size="large" color="#fff"/> : <Text style={styles.text}>{title}</Text>
      }
    </Pressable>
  );
};

export default CustomButton;

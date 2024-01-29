import React from "react";
import { Text, TextStyle } from "react-native";
import { styles } from "../../styles";

interface CustomTextProps {
  title: string;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({ title, style }) => {
  return (
    <>
      <Text style={[styles.text, style]}>{title}</Text>
    </>
  );
};

export default CustomText;

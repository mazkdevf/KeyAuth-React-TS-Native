import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BackBtn: React.FC<SvgProps> = (props) => (
  <Svg
    width={50}
    height={50}
    fill="none"
    stroke="white"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path stroke="none" d="M0 0h35v35H0z" />
    <Path d="m25 15-15 15 15 15" />
  </Svg>
);

export default BackBtn;

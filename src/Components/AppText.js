import React, {useEffect, useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AppText = ({Label, color, size,textTransform, family, textAlign, nol}) => {
  return (
    <Text
      numberOfLines={nol}
      style={{
        color: color,
        fontFamily: family,
        fontSize: size,
        textAlign: textAlign,
        flexShrink: 1,
        textTransform: textTransform || 'capitalize',
      }}>
      {Label}
    </Text>
  );
};
export default AppText;

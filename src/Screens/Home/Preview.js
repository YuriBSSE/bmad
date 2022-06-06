import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  
  return (
    <View style={styles.videoContainer}>
      <View style={[styles.imageContainer, styles.shadow]}>
        <Image
          // resizeMethod="cover"
          style={styles.videoPreview}
          source={{uri: item}}
          resizeMode='stretch'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPreview: {
    width: width * 0.85,
    height: height * 0.28,
    // borderRadius: 8,
    margin: width * 0.022,
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

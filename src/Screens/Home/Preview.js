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
import AutoHeightImage from 'react-native-auto-height-image';

export default Preview = ({
item
}) => {
  console.log(item, "IMAGE");
  return (
    <View style={styles.videoContainer}>
      <View style={[styles.imageContainer, styles.shadow]}>
       
      {
        item ?
        <AutoHeightImage
        width={width*0.9}
        source={{uri:item}}
      />
        // <Image
        //   // resizeMethod="cover"
        //   style={styles.videoPreview}
        //   source={{uri: item}}
        //   resizeMode='contain'
        // />
        :
        <Image
        // resizeMethod="cover"
        style={styles.videoPreview}
        source={{uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}}
        resizeMode='contain'
      />

      }
        
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white'
  },
  videoPreview: {
    width: width * 0.85,
    height: height * 0.25,
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
        backgroundColor: 'white'
      },
      android: {
        elevation: 5,
        backgroundColor: 'white'
      },
    
    }),
  },
});

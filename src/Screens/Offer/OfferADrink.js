import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './../../Components/AppText';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import * as actions from '../../Store/Actions/index';
import LottieView from 'lottie-react-native';
import {imageUrl} from '../../Config/Apis.json';

const {width, height} = Dimensions.get('window');

const OfferADrink = ({
  usersNearmeReducer,
  navigation,
  userReducer,
  connectUser,
}) => {
  const NEARME_USERDATA = usersNearmeReducer?.user;
  const [loading, setLoading] = useState(false);
  // send request to drink buddy
  const _onPressConfirm = async () => {
    setLoading(true);
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: NEARME_USERDATA?.id,
    };
    await connectUser(apiData, onSuccess, NEARME_USERDATA,_onRequestFialed);
  };

  const onSuccess = () => {
    navigation.navigate('ProceedToPay');
  };

  const _onRequestFialed = () => {
    setLoading(false);
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EA2C2E',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{top: height * -0.2}}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={width * 0.13}
          color="white"
          Label={'Cheers!'}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          position: 'relative',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            right: 50,
          }}>
          <View style={{position: 'absolute', left: 10}}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 10,
                borderColor: '#EA2C2E',
              }}
              // resizeMethod="auto"
              source={
                userReducer?.data?.user_image !== null &&
                userReducer?.data?.user_image !== undefined
                  ? {uri: `${imageUrl}/${userReducer?.data?.user_image}`}
                  : require('../../Assets/Images/placeholderImage.jpg')
              }
            />
          </View>
          <View style={{position: 'absolute'}}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 10,
                borderColor: '#EA2C2E',
              }}
              // resizeMethod="auto"
              source={{uri: `${imageUrl}/${NEARME_USERDATA?.image}`}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          top: height * 0.17,
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
        }}>
        <AppText
          nol={5}
          textAlign="center"
          family="Poppins-SemiBold"
          size={width * 0.045}
          color="white"
          Label={`Proceed to Offer a Drink to ${NEARME_USERDATA?.name} Today!`}
        />
      </View>
      {loading ? (
        <>
        <LottieView
          style={{
            position: 'absolute',
            bottom: height * 0.05,
            left: width * 0.15,
            // backgroundColor:'white',
            width: width * 0.4,
            height: height * 0.3,
          }}
          source={require('../../Assets/Lottie/white-loader.json')}
          autoPlay
          loop
        />
        <Text style={{color:'white', fontSize:width* 0.04,
       position: 'absolute',
       bottom: height * 0.16,
       left: width * 0.37,
       fontFamily:'Poppins-Bold'
      }}>Please Wait</Text>
        </>

      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            marginBottom: height * 0.05,
          }}>
          <TouchableOpacity
            onPress={() => _onPressConfirm()}
            style={styles.touchableOpacity}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('2.5%')}
              color="black"
              Label={'Confirm'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('HOME')}
            style={[styles.touchableOpacity, {marginTop: height * 0.02}]}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('2.5%')}
              color="black"
              Label={'Later'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = ({userReducer, usersNearmeReducer}) => {
  return {userReducer, usersNearmeReducer};
};
export default connect(mapStateToProps, actions)(OfferADrink);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('60%'),
    height: hp('9%'),
    justifyContent: 'center',
    borderRadius: 35,
    alignItems: 'center',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
});

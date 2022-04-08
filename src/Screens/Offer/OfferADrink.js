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
import {imageUrl} from '../../Config/Apis.json';

const {width, height} = Dimensions.get('window');

const OfferADrink = ({
  usersNearmeReducer,
  navigation,
  userReducer,
  connectUser,
}) => {
  const NEARME_USERDATA = usersNearmeReducer?.user;
console.log(NEARME_USERDATA)
  // send request to drink buddy
  const _onPressConfirm = () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: NEARME_USERDATA?.id,
    };
    connectUser(apiData, onSuccess,NEARME_USERDATA);
  };

  const onSuccess = () => {
    navigation.navigate('ProceedToPay');
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
      <View style={{top: -150}}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={hp('4%')}
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
              source={{uri: `${imageUrl}/${userReducer?.data?.user_image}`}}
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
          top: 120,
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
        }}>
        <AppText
          nol={5}
          textAlign="center"
          family="Poppins-SemiBold"
          size={hp('2%')}
          color="white"
          Label={`Proceed to Offer a Drink to ${NEARME_USERDATA?.name} Today!`}
        />
      </View>
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

import React, {useState, useEffect} from 'react';
import Main from './Main';
import {Provider, connect} from 'react-redux';
import {
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import store from './Store/index';
import FlashMessage from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
const App = () => {
  const [loginState, onChangeLoginState] = React.useState(false);

  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            console.log('Permission Denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    console.log('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // setLocationStatus('You are Here');
        console.log(position, 'APP getCurrentPosition');
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        // setLocationStatus('You are Here');
        console.log(position, 'APP.js watchPosition');
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <Provider store={store}>
      <Main />
      <FlashMessage
        position="top"
        statusBarHeight="10"
        style={{
          position: 'absolute',
          zIndex: 9999,
          borderRadius: 12,
          top: 30,
          width: '96%',
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
    </Provider>
  );
};

export default App;

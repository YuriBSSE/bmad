import React, {useState, useEffect} from 'react';
import AuthRootStackScreen from './AuthRootStackScreen';
import {connect} from 'react-redux';
import {PermissionsAndroid,Platform} from 'react-native';
import * as actions from './Store/Actions';
import {NavigationContainer} from '@react-navigation/native';
import MainAppScreens from './InApp';
import Geolocation from '@react-native-community/geolocation';

const Main = ({userReducer, userCoordsReducer, nearMeUsers, coords}) => {
  const USER_ID = userReducer?.data?.user_id;

  // const [token, onChangeToken] = useState(null);
  // useEffect(() => {
  //   console.log();
  //   try {
  //     async function GetToken() {
  //       let Token = await AsyncStorage.getItem('token');
  //       if (Token) {
  //         console.log(Token, 'Data OF USER');
  //         if (userLogin?.data?.id) {
  //           // alert("SADAD")
  //           userGet(userLogin.data.id);
  //         }
  //         // console.log(Token.Token, 'Token OF USER')
  //         onChangeToken(Token);
  //       }
  //     }
  //     GetToken();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //   if(userLogin?.data?.id){
  //   //     userGet(userLogin.data.id)
  //   //     console.log(userLogin.data.id, "MAIN SCREEN")
  //   //     nearMeUsers(coords.latitude, coords.longitude, userLogin.data.id)
  //   //   }
  //   //   console.log(userLogin?.data?.id, "MAIN SCREEN")
  //   //   console.log(coords, "COORDINATE MAIN SCREEN")
  // }, [userReducer]);

  // useEffect(()=>{
  //   if(userLogin?.data?.id){
  //     userGet(userLogin.data.id)
  //     console.log(userLogin.data.id, "MAIN SCREEN")
  //   }
  //   console.log(userLogin?.data?.id, "MAIN SCREEN")

  // },[])

  // useEffect(() => {
  //   console.log(userAuthSignUp, 'MAIN userAuthSignUp');
  //   // if()
  //   onChangeToken(userAuthSignUp.token);
  //   // if(userAuthSignUp){
  //   //   console.log(userAuthSignUp, "userAuthSignUp")
  //   //   //  onChangeToken()
  //   // }else{
  //   //   onChangeToken(null)
  //   // }
  // }, [userAuthSignUp]);
  // // if(userLogin.token ||  token){
  // //   return(
  // //     <View style={{justifyContent:'center', flex: 1, alignItems:'center'}}>
  // //       <ActivityIndicator size={40} color="red"/>
  // //     </View>
  // //   )
  // }

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
            BackHandler.exitApp();
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  }, []);

  const getOneTimeLocation = () => {
    // console.log('one time==================');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // setLocationStatus('You are Here');
        // console.log("----------------- get one time")
        coords(position.coords.latitude, position.coords.longitude);
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
    // watchID = Geolocation.watchPosition(
    //   position => {
    //     coords(position.coords.latitude, position.coords.longitude);
    //   },
    //   error => {
    //     console.log(error.message);
    //   },
    //   {
    //     enableHighAccuracy: false,
    //     maximumAge: 1000,
    //   },
    // );
  };

  useEffect(() => {
    if (
      userReducer?.accessToken &&
      userCoordsReducer.lat !== '' &&
      userCoordsReducer.long !== '' &&
      USER_ID !== undefined
    ) {
      // nearMeUsers(userCoordsReducer?.lat, userCoordsReducer?.long, USER_ID);
      nearMeUsers('24.7931192', '67.000000', USER_ID);
    }
  }, [userCoordsReducer]);
  return (
    <>
      {userReducer?.accessToken ? (
        <MainAppScreens />
      ) : (
        <NavigationContainer>
          <AuthRootStackScreen />
        </NavigationContainer>
      )}
    </>
  );
};

const mapStatetoProps = ({userReducer, userAuthSignUp, userCoordsReducer}) => {
  return {userReducer, userAuthSignUp, userCoordsReducer};
};

export default connect(mapStatetoProps, actions)(Main);

// {
//   userLogin.token ||  token ?
//   <AuthRootStackScreen/> : (
//     <NavigationContainer>
//          <MainAppScreens />
//     </NavigationContainer>
//   )
// }

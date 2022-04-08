import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TouchableOpacityBtn from './../../Components/TouchableOpacity';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
// import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MainScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const moveToTop = useRef(new Animated.ValueXY({x: 10, y: 300})).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  const [expanded, setExpanded] = useState(false);
  // const [position, setposition] = useState('center');

  useEffect(() => {
    SplashScreen.hide();
    changePosition();
    fadeChange();

    //  LoginManager.logInWithPermissions(["public_profile",  'email',  'user_friends']).then(
    //     function(result) {
    //       if (result.isCancelled) {
    //         console.log("Login cancelled");
    //       } else {
    //         console.log(
    //           "Login success with permissions: " +
    //             result.grantedPermissions.toString()
    //         );
    //       }
    //     },
    //     function(error) {
    //       console.log("Login fail with error: " + error);
    //     }
    //   );
    //  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //  return subscriber; // unsubscribe on unmount
  }, []);

  const changePosition = () => {
    Animated.timing(moveToTop, {
      toValue: {x: 0, y: 100},
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const fadeChange = async () => {
    // const token = 'sad!#$!@$ASDAD!@#$!@#'
    // await AsyncStorage.setItem('token',token)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions\

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]);

    console.log(result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require('./../../Assets/Images/Bg1.png')}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Animated.View
            style={[
              {display: 'flex', justifyContent: 'center', alignItems: 'center'},
              moveToTop.getLayout(),
            ]}>
            <Image
              style={styles.imageLogo}
              resizeMode="contain"
              source={require('./../../Assets/Images/brand.png')}
            />
          </Animated.View>
          <Animated.View style={[styles.outerContainer, {opacity: fadeAnim}]}>
            <Animated.View style={styles.innerContainer}>
              <TouchableOpacityBtn
                onPress={() => navigation.navigate('login')}
                title="Sign In"
              />
            </Animated.View>
            <Animated.View style={styles.innerContainer}>
              <TouchableOpacityBtn
                onPress={() => {
                  // return
                  navigation.navigate('signup');
                }}
                title="Sign Up"
              />
            </Animated.View>
            <Animated.View style={{padding: 30}}>
              <Text style={styles.touchableOpacityText}>Or</Text>
            </Animated.View>
            <Animated.View
              style={{
                padding: 30,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {/* <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      if (Platform.OS === 'ios') {
                        AuthenticationToken.getAuthenticationTokenIOS().then((data) => {
                          console.log(data?.authenticationToken);
                        });
                      } else {
                        AccessToken.getCurrentAccessToken().then((data) => {
                          console.log(data?.accessToken.toString());
                        });
                      }
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                  loginTrackingIOS={'limited'}
                  nonceIOS={'my_nonce'}
                /> */}
              <TouchableOpacity
                onPress={() =>
                  onFacebookButtonPress().then(() =>
                    console.log('Signed in with Facebook!'),
                  )
                }>
                <Image
                  style={styles.icons}
                  resizeMode="contain"
                  source={require('./../../Assets/Images/Facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.icons}
                  resizeMode="contain"
                  source={require('./../../Assets/Images/Instagram.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.icons}
                  resizeMode="contain"
                  source={require('./../../Assets/Images/twitter.png')}
                />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

var styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('100%'),
  },
  touchableOpacity: {
    borderWidth: 2,
    borderColor: 'white',
    width: wp('60%'),
    height: hp('6%'),
    justifyContent: 'center',
    borderRadius: 25,
  },
  touchableOpacityText: {
    color: 'white',
    //   fontFamily: ''
    fontFamily: 'Poppins-Regular',
    fontSize: hp('2'),
    textAlign: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    // or 'stretch'
  },
  imageLogo: {
    width: wp('35%'),
    height: hp('35%'),
  },
  outerContainer: {
    alignSelf: 'center',
    width: wp('80%'),
    height: hp('70%'),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  icons: {
    width: 60,
    height: 60,
  },
});

export default MainScreen;

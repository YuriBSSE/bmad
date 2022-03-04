import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Screens/Main/MainScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import FavoriteDScreen from './Screens/Signup/FavoriteDScreen';
import SignupScreen from './Screens/Signup/SignupScreen';
import InterestScreen from './Screens/Signup/InterestScreen';
import ForgotScreen from './Screens/Forgot/ForgotScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as actions from './Store/Actions';
import {NavigationContainer} from '@react-navigation/native';
import {SignUpStepOne} from './Store/Actions';
const AuthStack = createStackNavigator();

const SignUpFunction = (userSignup, userFavourite, userInterest, SignupAll) => {
  SignupAll(userSignup, userFavourite, userInterest);
  // console.log(userSignup,userFavourite,userInterest, "-----")
};

const AuthRootStackScreen = ({
  navigation,
  userSignup,
  userFavourite,
  userInterest,
  SignupAll,
}) => (
  <AuthStack.Navigator
    headerMode="float"
    screenOptions={{gestureEnabled: 'true'}}
    initialRouteName="main">
    <AuthStack.Screen
      name="main"
      options={{headerShown: false}}
      component={MainScreen}
    />
    <AuthStack.Screen
      name="login"
      options={{headerShown: false}}
      component={LoginScreen}
    />
    <AuthStack.Screen
      name="forgot"
      options={{headerShown: false}}
      component={ForgotScreen}
    />
    <AuthStack.Screen
      name="signup"
      options={({navigation, route}) => ({
        headerTitle: props => null,
        headerTransparent: true,
        headerLeft: () => null,
      })}
      component={SignupScreen}
    />
    <AuthStack.Screen
      name="YourInterests"
      options={({navigation, route}) => ({
        headerTitle: props => (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'black',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Your Interests
          </Text>
        ),
        headerTransparent: false,
        headerLeft: () => (
          <View style={{left: 20}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="#B01125" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{right: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FavoriteDrinks')}>
              <View
                style={{
                  backgroundColor: '#B01125',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  borderColor: 'white',
                  borderWidth: 1,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('./Assets/Images/Check.png')}
                  style={{width: 20, height: 20, margin: 4}}
                />
              </View>
            </TouchableOpacity>
          </View>
        ),
      })}
      component={InterestScreen}
    />
    <AuthStack.Screen
      name="FavoriteDrinks"
      options={({navigation, route}) => ({
        headerTitle: props => (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'black',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Favorite Drinks
          </Text>
        ),
        headerTransparent: false,
        headerLeft: () => (
          <View style={{left: 20}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="#B01125" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{right: 20}}>
            <TouchableOpacity
              onPress={() =>
                SignUpFunction(
                  userSignup,
                  userFavourite,
                  userInterest,
                  SignupAll,
                )
              }>
              <View
                style={{
                  backgroundColor: '#B01125',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  borderColor: 'white',
                  borderWidth: 1,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('./Assets/Images/Check.png')}
                  style={{width: 20, height: 20, margin: 4}}
                />
              </View>
            </TouchableOpacity>
          </View>
        ),
      })}
      component={FavoriteDScreen}
    />
  </AuthStack.Navigator>
);

const mapStatetoProps = ({userSignup, userFavourite, userInterest}) => {
  return {userSignup, userFavourite, userInterest};
};
export default connect(mapStatetoProps, actions)(AuthRootStackScreen);

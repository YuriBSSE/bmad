import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewPostScreen from './NewPostScreen';
import MessageIcon from '../../Components/MessageIcon';
import Icon from 'react-native-vector-icons/Ionicons';

const NewPostStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="newpost">
      <Stack.Screen
        name="newpost"
        options={({route}) => ({
          headerStyle: {height: 110},
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              New Post
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
            <View
              style={{
                backgroundColor: '#B01125',
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
                right: 20,
              }}>
              {/* <Image
                resizeMode="contain"
                source={require('./../../Assets/Images/Check.png')}
                style={{width: 20, height: 20, margin: 4}}
              /> */}
            </View>
          ),
        })}
        component={NewPostScreen}
      />
    </Stack.Navigator>
  );
};

export default NewPostStack;

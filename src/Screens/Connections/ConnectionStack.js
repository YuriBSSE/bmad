import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MessageIcon from '../../Components/MessageIcon';
import Connections from './Connections';
import ProfileScreen from '../NearMe/ProfileScreen';

const ConnectionStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="connections">
      <Stack.Screen
        name="connections"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            height: 110,
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Connections
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 3}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../Assets/Images/menu.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => <MessageIcon navigation={navigation} />,
        })}
        component={Connections}
      />

      <Stack.Screen
        name="profile"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: '#EA2C2E',
            borderBottomWidth: 2,
            backgroundColor: '#EA2C2E',
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Profile
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 3}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../Assets/Images/menu1.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => <MessageIcon1 navigation={navigation} />,
        })}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default ConnectionStack;


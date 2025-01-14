import {View, StyleSheet, LogBox, Text, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {themeRed} from './Assets/Colors/Colors';
import Home from 'react-native-vector-icons/Feather';
import ProfileStack from './Screens/Home/Profile/ProfileStack';
import Location from 'react-native-vector-icons/MaterialIcons';
import Notification from 'react-native-vector-icons/Ionicons';
import HomeStack from './Screens/Home/HomeStack';
import NewPostStack from './Screens/NewPost/NewPostStack';
import NotificationStack from './Screens/Notification/NotificationStack';
import NearMeStack from './Screens/NearMe/NearMeStack';
import MessageStack from './Screens/Messages/MessageStack';
import * as actions from './Store/Actions';
import {useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import BmadStack from './Screens/BMAD/BmadStack';
const {width, height} = Dimensions.get('window');

const MyTabs = ({
  userReducer,
  notificationsReducer,
  showNotificationsBadge,
  resetTotalUnreadNotificationsCount,
}) => {
  const route = useRoute();

  const Tab = createBottomTabNavigator();
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  console.log(routeName, 'sdsadsasadsadssdadas');
  useEffect(() => {
    if (notificationsReducer?.unreadNoti > 0) {
      setHasNewRequests(true);
    } else {
      setHasNewRequests(false);
    }
  }, [notificationsReducer?.unreadNoti]);

  return (
    <Tab.Navigator
      initialRouteName="HOME"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        // inactiveTintColor:'red',
        tabStyle: {
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
          // commented for android mobiles
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 5,
          // backgroundColor: '#F8F8F8',
        },

        // inactiveBackgroundColor:'#F8F8F8',
        activeBackgroundColor: '#F8F8F8',
        activeTintColor: '#B01125',

        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderBottomLeftRadius: 14,
          borderTopRightRadius: 14,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#F8F8F8',
        },
        iconStyle: {
          marginTop: 0,
        },
        labelStyle: {
          marginBottom: 0,
          paddingBottom: 7,
          fontSize: width * 0.028,
        },
      }}>
      <Tab.Screen
        name="HOME"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Home name="home" style={{}} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="nearme"
        component={NearMeStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // if (route.state && route.state.routeNames.length > 0) {
            navigation.navigate('nearme');
            // }
          },
        })}
        options={({navigation}) => ({
          tabBarLabel: 'Nearby Me',
          tabBarIcon: ({color, size}) => {
            // console.log(navigation)
            return (
              <Location
                name="location-on"
                style={{}}
                size={size}
                color={color}
                // onPress={() => {
                //   navigation.navigate('nearme', {
                //     screen: 'nearme',
                //     initial: false,
                //   });
                // }}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="newpost"
        component={NewPostStack}
        options={{
          tabBarLabel: 'New Post',
          tabBarIcon: ({color, size}) => (
            <Home name="plus-square" style={{}} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="notification"
        component={NotificationStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            showNotificationsBadge(false);
            resetTotalUnreadNotificationsCount();
          },
        })}
        options={({navigation}) => ({
          tabBarLabel: 'Notification',
          tabBarBadge:
            // routeName === 'notification'
            //   ? null
            //   :
            hasNewRequests && notificationsReducer?.unreadNoti > 0
              ? notificationsReducer?.unreadNoti
              : null,
          tabBarBadgeStyle: {color: 'white', backgroundColor: themeRed},
          tabBarIcon: ({color, size}) => (
            <Notification
              name="notifications-outline"
              style={{}}
              size={size}
              color={color}
              onPress={() => {
                showNotificationsBadge(false);
                resetTotalUnreadNotificationsCount();
                navigation.navigate('notification', {
                  screen: 'notification',
                  initial: false,
                });
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="BMAD"
        component={ProfileStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // if (route.state && route.state.routeNames.length > 0) {
            navigation.navigate('BMAD');
            // }
          },
        })}
        options={({navigation}) => ({
          tabBarLabel: 'Bmad',
          tabBarIcon: ({color, size}) => (
            <Notification
              name="fast-food-outline"
              style={{}}
              size={size}
              color={color}
              // onPress={() => {
              //   navigation.navigate('BMAD', {
              //     screen: 'BMAD',
              //     initial: false,
              //   });
              // }}
            />
          ),
        })}
      />
      {/* <Tab.Screen
          name="userStack"
          component={UserStack}
          options={{
            tabBarLabel: 'BMAD',
            tabBarIcon: ({color, size}) => (
              <Notification
                name="fast-food-outline"
                style={{}}
                size={size}
                color={color}
              />
            ),
          }}
        /> */}
      {/* <Tab.Screen
          name="bmad"
          component={BmadStack}
          options={{
            tabBarVisible: true,
            tabBarIcon: () => null,
            tabBarLabel: '',
            tabBarAccessibilityLabel: '',
            tabBarVisibilityAnimationConfig: () => null,
            tabBarButton: () => null,
          }}
        /> */}
      <Tab.Screen
        name="message"
        component={MessageStack}
        options={{
          tabBarVisible: true,
          tabBarIcon: () => null,
          tabBarLabel: '',
          tabBarAccessibilityLabel: '',
          // @ts-ignore
          tabBarVisibilityAnimationConfig: () => null,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
const mapStateToProps = ({userReducer, notificationsReducer}) => {
  return {userReducer, notificationsReducer};
};

export default connect(mapStateToProps, actions)(MyTabs);

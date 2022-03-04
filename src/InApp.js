import React, { Component, useEffect, useState } from "react";
import {View,StyleSheet,LogBox  } from "react-native"

import Home from 'react-native-vector-icons/Feather';
import SplashScreen from  "react-native-splash-screen";
import Location from 'react-native-vector-icons/MaterialIcons';
import Notification from 'react-native-vector-icons/Ionicons';
import HomeStack  from './Screens/Home/HomeStack';
import BmadStack from './Screens/BMAD/BmadStack';
import NewPostStack from './Screens/NewPost/NewPostStack';
import NotificationStack from './Screens/Notification/NotificationStack';
import NearMeStack from './Screens/NearMe/NearMeStack';
import UserStack from './Screens/Users/UsersStack';
import MessageStack from './Screens/Messages/MessageStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OfferADrink from './Screens/Offer/OfferADrink'
import OutOfDrink from './Screens/Offer/OutOfDrink'
import ProceedToPay from './Screens/Offer/ProceedToPay'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Animated, {interpolate} from 'react-native-reanimated';
import {withFancyDrawer} from './withFancyHeader';
import DrawerContent from './CustomDrawer';
import AddCardStepOne from "./Screens/Offer/AddCard/AddCardStepOne";
import { CreditCards } from "./Screens/Offer/AddCard/CreditCards";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStack from "./Screens/Home/Profile/ProfileStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageIcon from "./Components/MessageIcon1";
import AppText from "./Components/AppText";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import { AuthContext } from '../../AuthContext';
import ChatStack from "./Screens/Chat/ChatStack";
import * as actions from './Store/Actions'
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native";
LogBox.ignoreLogs(['Warning: Cannot update a component (`MainAppScreens`) while rendering a different component (`DrawerView`). To locate the bad setState() call inside `DrawerView`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export const AnimatedContext = React.createContext(void 0);
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function MyTabs() {


  // console.log(getNearMeUsers, "==========================TAB===========================")
    return (
      <Tab.Navigator
      initialRouteName="HOME"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle:{
          borderBottomLeftRadius:15,
          borderTopRightRadius: 15,
        },
        
        activeBackgroundColor: '#F8F8F8',
        activeTintColor: '#B01125',
        style:{
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              borderBottomLeftRadius:14,
              borderTopRightRadius: 14,
              height: 70, 
              
        },
        iconStyle:{
              marginTop:0
        },
        labelStyle:{
              marginBottom:0,
              paddingBottom:7
        },
      }}
      >
        <Tab.Screen
          name="HOME"
          component={HomeStack}
          options={{    
            tabBarLabel: "Home",
            tabBarIcon: ({ color,size }) => ( 
              <Home name="home"  style={{}} size={size} color={color}  />
            )
          }}
        />
        <Tab.Screen
          name="nearme"
          component={NearMeStack}
          options={{
            tabBarLabel: 'Nearby Me',
            tabBarIcon: ({ color,size }) => (
                <Location name="location-on" style={{}} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="newpost"
          component={NewPostStack}
          options={{ 
            tabBarLabel: 'New Post',
            tabBarIcon: ({ color,size }) => (
               <Home name="plus-square" style={{}} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="notification"
          component={NotificationStack}
          options={{ 
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
               <Notification name="notifications-outline" style={{}} size={size} color={color} />
            ),
          }}
        />
         <Tab.Screen
          name="userStack"
          component={UserStack}
          options={{
            tabBarLabel: 'BMAD',
            tabBarIcon: ({ color, size }) => (
              <Notification name="fast-food-outline" style={{}} size={size} color={color} />
            ),
          }}
        />
         <Tab.Screen
          name="bmad"
          component={BmadStack}
          options={{
            tabBarVisible: true,
            tabBarIcon: ()=> null,
            tabBarLabel: '',
            tabBarAccessibilityLabel: '',
            tabBarVisibilityAnimationConfig: ()=> null,
            tabBarButton: ()=> null
          }}
        />
         <Tab.Screen
          name="message"
          component={MessageStack}
          options={{
            tabBarVisible: true,
            tabBarIcon: ()=> null,
            tabBarLabel: '',
            tabBarAccessibilityLabel: '',
            tabBarVisibilityAnimationConfig: ()=> null,
            tabBarButton: ()=> null
          }}
        />
      </Tab.Navigator>
    );
  }
const BottomTab = ({navigation}) => {
    useEffect(() => {
        SplashScreen.hide();
       },[]);
    return(
        <MyTabs Navi={navigation} />
    )
 }


// const STACK = 

const MainAppScreens = ({userGet}) => {

  const getId = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData')
      // console.log(userGet.userGet(userData))
      if(userData != null) {
        userGet(userData)
        // let row = JSON.stringify(userData)
        // userGet(userData)
        // console.log(userData, 'UserInfo')
      }
    } catch(e) {
      console.log(e)
    }
  }

  // const userDataGets = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem('user')
  //     // console.log(userGet.userGet(userData))
  //     if(userData != null) {
  //       userGet(userData)
  //       // let row = JSON.stringify(userData)
  //       // userGet(userData)
  //       // console.log(userData, 'UserInfo')
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }


  useEffect(()=>{
    try{
        getId()
    }catch(error){
      console.log(error)
    }
    // console.log("sdadasd")
    // return = () => setAnimatedValue(1);
  },[])
  const STACK = createStackNavigator();
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    return(
      <AnimatedContext.Provider   value={animatedValue}>
        <View style={{backgroundColor: '#B01125', flex: 1}}>
        <NavigationContainer>
          <Drawer.Navigator
          statusBarAnimation='slide'
          minSwipeDistance={12}
            drawerStyle={{
              backgroundColor: 'transparent',
            }}
            drawerType={'slide'}
            initialRouteName="home"
            overlayColor="transparent"
            drawerContent={props => {
              setAnimatedValue(props.progress);
              return <DrawerContent  {...props} />;
            }}
            >
                <Drawer.Screen name="home"  component={withFancyDrawer(BottomTab)} />
                <Drawer.Screen name="cards" component={withFancyDrawer(CreditCards)} />
                <Drawer.Screen name="profile" component={withFancyDrawer(ProfileStack)} />
                  
                <STACK.Screen 
                    name="OfferADrink" 
                    options={{headerShown:false}} 
                    component={withFancyDrawer(OfferADrink)}
                />
                  <STACK.Screen 
                      name="OutOfDrink" 
                      options={{headerShown:false}} 
                      component={withFancyDrawer(OutOfDrink)}
                  /> 
                  <STACK.Screen 
                      name="ProceedToPay" 
                      options={{headerShown:false}} 
                      component={withFancyDrawer(ProceedToPay)}
                  />     
                  <STACK.Screen 
                      name="chats" 
                      options={{headerShown:false}} 
                      component={withFancyDrawer(ChatStack)}
                  />           
          </Drawer.Navigator>
        </NavigationContainer>
        </View>
        
        </AnimatedContext.Provider>
    )
}

// function mapStateToProps({getNearMeUsers}) {
//   return {getNearMeUsers};
// }


export default connect(null,actions)(MainAppScreens, MyTabs)
// export default MainAppScreens;
var styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

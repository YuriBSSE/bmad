import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NotificationList from './NotificationList'
import Noti from './../../../model/Notifications';
const NotificationScreen = ({navigation}) => {
   
    const Separater=()=>{
        return(
            <View
                style={{
                  height: 50
                }}
                />
        )
    }
   
    return(
        <View style={styles.container}>
            <FlatList  
                bounces
                bouncesZoom
                maintainVisibleContentPosition
                showsVerticalScrollIndicator={false}
                data={Noti}
                ListHeaderComponent={<View style={{height:50}}></View>}
                ListFooterComponent={<View style={{height: 120}}></View>}
                scrollEnabled
                style={{width:'100%',}}
                ItemSeparatorComponent={Separater}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => 
                  <NotificationList
                    Time={item.MessageTime}
                    Img={item.Image} 
                    Name={item.Name}
                    Message={item.details}
                    OnlineStatus={item.OnlineStatus}
                    Navigation={navigation}
                    Assets={item.Assets}
                    Action={item.Action}
                  />}
                    keyExtractor={(item, index) => index}
                  />
                
        <View style={{height: 100}} />
        </View>
    )
}


export default NotificationScreen;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('103%'),
        backgroundColor: 'white'
    }
})
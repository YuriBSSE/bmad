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
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {Badge} from 'react-native-elements';
import AppText from '../../Components/AppText';
import Avatar from './../../Components/Avatar';
import NotificationAction from '../../Components/NotificationAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const NotificationList = ({
  Img,
  Name,
  Message,
  Navigation,
  Time,
  OnlineStatus,
  Assets,
  Action,
}) => {
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        margin: 40,
        top: -40,
        flexDirection: 'column',
        alignContent: 'space-around',
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          top: -20,
          width: '90%',
          position: 'absolute',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={hp('1.5%')}
          color="#757575"
          Label={Time}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <View
            style={{
              position: 'absolute',
              elevation: 10,
              zIndex: 9999,
              top: 25,
              left: -25,
            }}>
            <Avatar size="medium" source={Img} />
            <Badge
              badgeStyle={{
                height: 15,
                width: 15,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
                position: 'absolute',
              }}
              status={OnlineStatus ? 'success' : 'warning'}
              containerStyle={{position: 'absolute', top: -7, right: 12}}
            />
          </View>
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'white',
              zIndex: 4,
              elevation: 9,
              shadowColor: 'black',
              shadowOffset: {
                width: 2,
                height: 3,
              },
              shadowOpacity: 3.22,
              backgroundColor: 'white',
              padding: 20,
              position: 'absolute',
              width: '100%',
              paddingLeft: 30,
            }}>
            <View style={{flexDirection: 'column'}}>
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.7%')}
                color="#757575"
                Label={Name}
              />
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  top: 5,

                  alignContent: 'flex-start',

                  // width:'0%'
                }}>
                {Assets == null ? (
                  <NotificationAction
                    onPress={() => alert('ok')}
                    title={Action}
                  />
                ) : (
                  <FlatList
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    showsHorizontalScrollIndicator={false}
                    data={Assets}
                    horizontal
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (
                      <Image
                        source={item.image}
                        style={{
                          height: 30,
                          width: 35,
                          borderRadius: 4,
                          margin: 3,
                        }}
                      />
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 150,
    width: 150,
  },
});
export default NotificationList;

//  <View style={{ zIndex: 10,
//     elevation: 4,}}>
// <Avatar
//                 size='medium'
//                 source={Img}
//                 />
// <Badge
// badgeStyle={{height:15,width: 15, borderRadius:50, borderColor: 'white', borderWidth: 1, position: 'absolute'}}
// status={OnlineStatus ? 'success': 'warning'}
// containerStyle={{ position: 'absolute', top: -7, right: 12 }}
// />
// </View>
{
  /* <View style={{bottom:0}}>
          <AppText  nol={1}  textAlign='left'  family="Poppins-SemiBold" size={hp("1.5%")} color="#757575" Label={Time} />
        </View> */
}

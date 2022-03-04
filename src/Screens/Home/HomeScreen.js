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
  DeviceEventEmitter,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AppText from '../../Components/AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Avatara from '../../Components/Avatar';
import {Avatar} from 'react-native-elements';
import Posts from './../../../model/Posts';
import PostList from './PostList';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import * as actions from '../../Store/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({
  navigation,
  nearMeUsers,
  getNearMeUsers,
  coords,
  userGets,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(async () => {
    var user = await AsyncStorage.getItem('user');
    var parseData = JSON.parse(user);
    console.log(
      parseData?.user_id,
      '=====================/====================',
    );
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<div style='background-color: #f5fcff; border-radius: 100px;'> <h3 style='font-color:#31a4de'>This App access to your Location</h3>This App wants to change your device settings:<br/><br/>Use GPS for Location<br/></div>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      })
        .then(
          function (success) {
            Geolocation.getCurrentPosition(
              position => {
                let initialPosition = JSON.stringify(position);
                // console.log(position.coords.latitude, "IN")
                // console.log(position.coords.longitude, "IN")
                console.log(
                  parseData?.user_id,
                  '=======================HOME SCREEN==================',
                );
                if (parseData?.user_id) {
                  nearMeUsers(
                    position.coords.latitude,
                    position.coords.longitude,
                    parseData?.user_id,
                  );
                } else {
                  nearMeUsers(
                    position.coords.latitude,
                    position.coords.longitude,
                    userGets.user_id,
                  );
                }
                // nearMeUsers(position.coords.latitude,position.coords.longitude,userGets.user_id)
                coords(position.coords.latitude, position.coords.longitude);
                // console.log(position.longitude)
              },
              error => console.log(error),
              {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
            );
          }.bind(this),
        )
        .catch(error => {
          console.log(error.message);
        });

      BackHandler.addEventListener('hardwareBackPress', () => {
        LocationServicesDialogBox.forceCloseDialog();
      });

      DeviceEventEmitter.addListener(
        'locationProviderStatusChange',
        function (status) {
          console.log(status);
        },
      );
    } else {
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
    }
    return () => {
      // Anything in here is fired on component unmount.
      if (Platform.OS === 'android') {
        LocationServicesDialogBox.stopListener();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={{}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={Posts}
          ListFooterComponent={<View style={{height: 100}}></View>}
          ListHeaderComponent={
            getNearMeUsers?.length > 0 ? (
              <View style={styles.cardContainer}>
                <View style={styles.peopleNearContainer}>
                  <AppText
                    nol={1}
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="black"
                    Label={'People Near You'}
                  />
                  <AppText
                    nol={1}
                    family="Poppins-SemiBold"
                    size={hp('1.5%')}
                    color="black"
                    Label={'View More'}
                  />
                </View>
                <FlatList
                  contentContainerStyle={styles.innerFlatlistContentStyle}
                  showsHorizontalScrollIndicator={false}
                  data={getNearMeUsers}
                  horizontal
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View key={index} style={styles.cardHeaderStyle}>
                      <View style={{bottom: 10, width: 50}}>
                        <AppText
                          nol={1}
                          textAlign="center"
                          family="Poppins-Regular"
                          size={hp('1.5%')}
                          color="black"
                          Label={item.user_name}
                        />
                      </View>
                      {item?.user_image == '' ? (
                        <Avatar
                          size="large"
                          rounded
                          source={require('./../../Assets/Images/dp.png')}
                          containerStyle={{borderColor: 'grey', borderWidth: 2}}
                        />
                      ) : item.user_image.includes('ngrok') ? (
                        <Avatar
                          size="large"
                          rounded
                          source={require('./../../Assets/Images/dp.png')}
                          containerStyle={{
                            borderColor: 'grey',
                            borderWidth: 2,
                            bottom: 5,
                          }}
                        />
                      ) : (
                        <Avatar
                          size="large"
                          rounded
                          containerStyle={{borderColor: 'grey', borderWidth: 2}}
                          source={{
                            uri: item.user_image,
                          }}
                        />
                      )}
                      {item.distance != undefined ? (
                        <View style={{top: 7}}>
                          <AppText
                            nol={1}
                            textAlign="left"
                            family="Poppins-Regular"
                            size={hp('1.5%')}
                            color="black"
                            Label={item.distance.toPrecision(2) + ' km'}
                          />
                        </View>
                      ) : null}
                    </View>
                  )}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#B01125',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <AppText
                  nol={1}
                  family="Poppins-Bold"
                  size={hp('2%')}
                  color="white"
                  Label={'PEOPLE NEAR BY'}
                />
                <AppText
                  nol={1}
                  family="Poppins-Bold"
                  size={hp('2%')}
                  color="white"
                  Label={'NO PEOPLE FOUND'}
                />
              </View>
            )
          }
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <PostList
              Img={item.Images}
              Name={item.Name}
              Description={item.Description}
              ProfileImg={item.ProfileImage}
              UploadTime={item.UploadTime}
              TotalLike={item.TotalLike}
              Comment={item.Comment}
              Navigation={navigation}
            />
          )}
        />
      </View>
    </View>
  );
};

// nearMeUsers
function mapStateToProps({getNearMeUsers, userGets}) {
  return {getNearMeUsers, userGets};
}

export default connect(mapStateToProps, actions)(HomeScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  cardContainer: {
    alignSelf: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    width: '100%',
    shadowOpacity: 3.22,
    backgroundColor: 'white',
    height: hp('25'),
    marginBottom: 10,
  },
  peopleNearContainer: {
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignContent: 'space-between',
  },
  innerFlatlistContentStyle: {
    alignSelf: 'flex-start',
    margin: 5,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  cardHeaderStyle: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

{
  /* <FlatList
contentContainerStyle={{alignSelf: 'flex-start', margin: 5,alignContent:'flex-start',alignItems:'flex-start', flexDirection:'row'}}
showsHorizontalScrollIndicator={false}

data={getNearMeUsers}
horizontal
keyExtractor={(item, index) => index}
renderItem={({ item, index }) => 
    <View style={{padding: 10, justifyContent:'center', flexDirection: 'column', alignItems:'center'}}>
            <View style={{bottom: 10, width: 50}}>
                    <AppText  nol={2}  textAlign="center"  family="Poppins-Regular" size={hp("1.5%")} color="black" Label={item.user_name} />
            </View>
            {
                item.user_image == "" ?
                <Avatar
                size='medium'
                rounded
                source={require('./../../Assets/Images/dp.png')}
                />:
                <Avatar
                size='medium'
                rounded
                source={{
                    uri: item.user_image
                }}
               
              /> */
}

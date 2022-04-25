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
  Dimensions,
  RefreshControl,
} from 'react-native';
import AppText from '../../Components/AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Avatara from '../../Components/Avatar';
import LottieView from 'lottie-react-native';
import {Avatar} from 'react-native-elements';
import {imageUrl} from '../../Config/Apis.json';

// import Posts from './../../../model/Posts';
import PostList from './PostList';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import * as actions from '../../Store/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({
  coords,
  navigation,
  nearMeUsers,
  getFeedData,
  userReducer,
  postsReducer,
  usersNearmeReducer,
  userCoordsReducer,
  likePost,
  getAllConnections,
}) => {
  const USER_ID = userReducer?.data?.user_id;
  const [posts, setPosts] = useState(postsReducer?.feedPosts);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => {
      setRefreshing(false);
      setLoading(true);
      await getFeedData(USER_ID);
      await nearMeUsers(userCoordsReducer.lat, userCoordsReducer.long, USER_ID);
      
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    // console.log(JSON.stringify(postsReducer?.feedPosts, null, 2));
    setPosts(postsReducer?.feedPosts);
  }, [postsReducer?.feedPosts]);

  useEffect(() => {
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
            getOneTimeLocation();
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
      getOneTimeLocation();
    }
    if (Platform.OS === 'android') {
      return () => {
        // Anything in here is fired on component unmount.
        LocationServicesDialogBox.stopListener();
      };
    }
  }, []);

  const getOneTimeLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLoading(true);
        coords(position.coords.latitude, position.coords.longitude);
        await nearMeUsers(
          position.coords.latitude,
          position.coords.longitude,
          USER_ID,
        );
        await getFeedData(USER_ID);
        setLoading(false);
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

  const _onPressHeart = item => {
    const apiData = {
      post_id: item?.post_id,
      user_id: USER_ID,
    };
    likePost(apiData);
  };

  // useEffect(() => {
  //   if (userCoordsReducer?.lat !== null && userCoordsReducer?.long !== null) {
  //     nearMeUsers(userCoordsReducer?.lat, userCoordsReducer?.long, USER_ID);

  //     getFeedData(USER_ID);

  //     coords(userCoordsReducer?.lat, userCoordsReducer?.long);
  //   }
  // }, [userReducer?.data?.id,userCoordsReducer]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar translucent backgroundColor="transparent" />
        <LottieView
          style={{
            width: width * 0.3,
            height: height * 0.35,
          }}
          source={require('../../Assets/Lottie/loading-heart.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={posts}
          contentContainerStyle={{paddingBottom: 100}}
          ListFooterComponentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ListFooterComponent={() =>
            posts?.length === 0 && (
              <>
                <View style={{height: 30}}></View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <LottieView
                    style={{
                      width: width * 0.5,
                      height: height * 0.35,
                    }}
                    source={require('./../../Assets/Lottie/no-posts.json')}
                    autoPlay
                    loop
                  />
                  <View style={{marginTop: height * -0.07,width:width*0.7, justifyContent:'center',alignItems:'center'}}>
                  <AppText
                      nol={1}
                      family="Poppins-Bold"
                      size={width * 0.06}
                      style={{alignSelf:'center',}}
                      color="black"
                      Label={'No Posts'}
                    />
                    <AppText
                      nol={3}
                      family="Poppins-Medium"
                      size={width * 0.05}
                      style={{alignSelf:'center',}}
                      color="black"
                      Label={'Offer drinks and connect'}
                    />
                     <AppText
                     style={{marginTop:-5}}
                      nol={1}
                      family="Poppins-Medium"
                      size={width * 0.05}
                      color="black"
                      Label={' to see their posts.'}
                    />
                  </View>
                </View>
              </>
            )
          }
          ListHeaderComponent={
            usersNearmeReducer?.allUsers?.length > 0 ? (
              <View style={styles.cardContainer}>
                <View style={styles.peopleNearContainer}>
                  <AppText
                    nol={1}
                    family="Poppins-Regular"
                    size={hp('2%')}
                    color="black"
                    Label={'People Near You'}
                  />
                  <AppText
                    nol={1}
                    family="Poppins-Regular"
                    size={hp('1.5%')}
                    color="black"
                    Label={'View More'}
                  />
                </View>
                <FlatList
                  contentContainerStyle={styles.innerFlatlistContentStyle}
                  showsHorizontalScrollIndicator={false}
                  data={usersNearmeReducer?.allUsers}
                  horizontal
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View key={index} style={styles.cardHeaderStyle}>
                      {/* <View style={{bottom: 10, width: 50}}>
                      <AppText
                        nol={1}
                        textAlign="center"
                        family="Poppins-Regular"
                        size={hp('1.5%')}
                        color="black"
                        Label={item?.user_name}
                      />
                    </View> */}
                      {item?.user_image === undefined ? (
                        <Avatar
                          size="medium"
                          rounded
                          source={require('./../../Assets/Images/placeholderImage.jpg')}
                          containerStyle={{borderColor: 'grey', borderWidth: 1}}
                        />
                      ) : (
                        <Avatar
                          size="medium"
                          rounded
                          containerStyle={{borderColor: 'grey',}}
                          source={{
                            uri: `${imageUrl}/${item?.user_image}`,
                          }}
                        />
                      )}
                      {item?.distance != undefined ? (
                        <View style={{top: 7}}>
                          <AppText
                            nol={1}
                            textAlign="left"
                            family="Poppins-Regular"
                            size={hp('1.3%')}
                            color="black"
                            Label={item?.distance?.toPrecision(2) + ' km'}
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
          renderItem={({item, index}) => {
            return (
              <PostList
                item={item}
                Img={item?.post_url}
                Name={item?.user_id?.user_name}
                Description={item?.post_desc}
                ProfileImg={item?.user_id?.user_coverImage}
                UploadTime={item?.post_created_at}
                TotalLike={item?.count_likes}
                Comment={item?.count_comments}
                Navigation={navigation}
                _onPressHeart={_onPressHeart}
              />
            );
          }}
        />
      }
    </View>
  );
};

// nearMeUsers
function mapStateToProps({
  usersNearmeReducer,
  userReducer,
  postsReducer,
  userCoordsReducer,
}) {
  return {usersNearmeReducer, userReducer, postsReducer, userCoordsReducer};
}

export default connect(mapStateToProps, actions)(HomeScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: height,
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
    // borderWidth: 1,
    borderColor: 'white',
    zIndex: 4,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: width,
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    height: height * 0.17,
    marginBottom: 10,
  },
  peopleNearContainer: {
    justifyContent: 'space-between',
    paddingTop: 10,
    flexDirection: 'row',
    width: width * 0.92,
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

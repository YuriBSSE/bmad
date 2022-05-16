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
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AppText from '../../Components/AppText';
import {connect} from 'react-redux';
import {imageUrl} from '../../Config/Apis.json';
import {useRoute, StackActions, useIsFocused} from '@react-navigation/native';
import * as actions from '../../Store/Actions/index';
import {themeRed} from '../../Assets/Colors/Colors';
//  import {useNavigation} from "@react-navigation/native"
// import { NavigationActions } from 'react-navigation';
const {width, height} = Dimensions.get('window');

const ProfileScreen = ({
  userReducer,
  navigation,
  unfriendUserFromProfile,
  route,
  usersNearmeReducer,
  cancelOfferFromProfile,
  createConversation,
  saveCurrentChatObject,
  messagesReducer,
  getUserData,
}) => {
  const [lines, onChangeLines] = useState(2);
  const [linesCondition, onChangeLinesCondition] = useState(false);
  const [nearMeUserData, setNearMeUserData] = useState(null);
  const isFocused = useIsFocused();
  // const nearMeUserData = usersNearmeReducer?.user;
  const USER_ID = userReducer?.data?.user_id;
  const profileData = route.params.userData;

  const [loading, setLoading] = useState(false);

  // console.log(navigation);
  const ReadMore = () => {
    onChangeLines(20);
    onChangeLinesCondition(true);
  };
  const ShowLess = () => {
    onChangeLines(2);
    onChangeLinesCondition(false);
  };

  // cancel my friend request sent to buddy
  const _cancelOfferRequest = async () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: nearMeUserData.user_id,
    };
    console.log('cancelling ...');
    cancelOfferFromProfile(apiData);
  };

  const _onPressRemoveFriend = () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: nearMeUserData.user_id,
    };
    console.log('removing');
    unfriendUserFromProfile(apiData);
  };

  const _onPressMessageButton = async () => {
    //below two lines tab tak k liye hen jb tk profile se messages kr rahe hen phr hatadnaa
    saveCurrentChatObject(nearMeUserData);
    navigation.navigate('chats');

    // const apiData = {
    //   sender: USER_ID,
    //   receiver: nearMeUserData?.user_id,
    // };
    // await createConversation(apiData, nearMeUserData, _onSuccess);
  };

  const _onSuccess = () => {
    navigation.navigate('chats');
  };

  useEffect(() => {
    if (
      usersNearmeReducer?.user !== null &&
      usersNearmeReducer?.user !== undefined
    ) {
      // console.log('After Cancelling Request: Data Changed');
      // console.log(usersNearmeReducer?.user);
      setNearMeUserData(usersNearmeReducer?.user);
    }
  }, [usersNearmeReducer?.user]);

  const getProfileData = async () => {
    setLoading(true);
    await getUserData(
      userReducer?.data?.user_id,
      route?.params?.userData?.user_id,
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getProfileData();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loaderView}>
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

      {/* User Profile Section  */}
      {nearMeUserData?.user_image === undefined ||
      nearMeUserData?.user_image == null ? (
        <Image
          style={styles.userProfilePic}
          source={require('./../../Assets/Images/userr.jpeg')}
          resizeMode="cover"
          resizeMethod="auto"
        />
      ) : (
        <Image
          style={styles.userProfilePic}
          source={{uri: `${imageUrl}/${nearMeUserData?.user_image}`}}
          // resizeMode=""
          // resizeMethod="auto"
        />
      )}

      {/* Total Profile Likes  */}
      {/* <View style={styles.heartContainer}>
        <AntDesign name="heart" style={{padding: 2}} size={width * 0.1} color="red" />
        <Text style={styles.totalLike}>{nearMeUserData?.is_like}</Text>
      </View> */}

      {/* User Info Section  */}
      <View style={styles.userInfoSection}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {/* Age and Name View  */}
          <View style={styles.ageAndNameView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={nearMeUserData?.user_name?.substring(0, 20)}
            />
            {/* <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'26'}
              // Label={nearMeUserData?.user_age}
            /> */}
          </View>

          {/* Profession View  */}
          <View style={styles.professionView}>
            {nearMeUserData?.user_title != null &&
              nearMeUserData?.user_title !== undefined &&
              nearMeUserData?.user_lives != null &&
              nearMeUserData?.user_lives != undefined && (
                <View style={styles.professionInnerView}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'Lecturer'}
                    // Label={nearMeUserData?.user_title}
                  />
                  {(nearMeUserData?.user_title != null ||
                    (nearMeUserData?.user_title !== undefined &&
                      nearMeUserData?.user_lives != null &&
                      nearMeUserData?.user_lives != undefined)) && (
                    <View style={styles.noProfessions} />
                  )}
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'New York City'}
                    // Label={nearMeUserData?.user_lives}
                  />
                </View>
              )}

            {/* Address View */}
            {nearMeUserData?.user_address != null && (
              <View style={styles.addressView}>
                <AppText
                  nol={3}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2%')}
                  color="white"
                  Label={
                    'New York, Times Square 1st Block 1st Cross Street# 43'
                  }
                  // Label={nearMeUserData?.user_address}
                />
              </View>
            )}

            {/* Kilometers Far Away  */}
            {/* <View style={styles.kilometerView}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.5%')}
                color="white"
                Label={
                  parseFloat(nearMeUserData?.distance).toFixed(2) +
                  ' Km far away'
                }
              />
            </View> */}
          </View>

          {/* Buttons View  */}
          <View style={styles.buttonsView}>
            {/* Connect Button  */}
            {nearMeUserData?.connected !== 'pending' && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (nearMeUserData?.connected === 'null') {
                    navigation.navigate('OfferADrink');
                  } else if (nearMeUserData?.connected === 'send') {
                    _cancelOfferRequest();
                  } else {
                    _onPressRemoveFriend();
                  }
                }}
                style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={width * 0.03}
                  color="black"
                  Label={
                    // status = send
                    nearMeUserData?.connected == 'null'
                      ? 'Offer A Drink'
                      : nearMeUserData?.connected == 'send' ||
                        nearMeUserData?.status === 'send'
                      ? 'Cancel Offer'
                      : 'Remove Friend'
                  }
                />
                {console.log(nearMeUserData?.connected, '...')}
              </TouchableOpacity>
            )}
            <View style={{width: 10}} />

            {/* Like Button  */}
            {nearMeUserData?.status === 'accepted' && (
            <TouchableOpacity
              // onPress={
              //   likeStatus == false ? is_like : likeStatus == true ? unlike : error
              // }
              activeOpacity={0.8}
              onPress={() => _onPressMessageButton()}
              style={styles.touchableOpacity}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={width * 0.03}
                color="black"
                Label={'Message'}
              />
            </TouchableOpacity>
            )}
          </View>

          {/* Favorite Heading  */}
          <View style={styles.FavoriteTextView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'Favourites'}
            />
          </View>

          {/* Favorites Flatlist */}
          <View style={styles.favoritesFlatlistView}>
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              data={nearMeUserData?.user_favorite}
              horizontal
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <View
                  style={{
                    margin: 10,
                  }}>
                  <ImageBackground
                    style={{width: 120, height: 120}}
                    resizeMode="contain"
                    imageStyle={{borderRadius: 5}}
                    source={
                      item == 'Old Fashioned'
                        ? require('../../Assets/Images/1.png')
                        : item == 'Margarita'
                        ? require('../../Assets/Images/2.png')
                        : item == 'Dark & Stormy'
                        ? require('../../Assets/Images/3.png')
                        : item == 'Mimosa'
                        ? require('../../Assets/Images/4.png')
                        : item == 'Manhattan'
                        ? require('../../Assets/Images/5.png')
                        : item == 'Whiskey Sour'
                        ? require('../../Assets/Images/6.png')
                        : item == 'Cosmopolitan'
                        ? require('../../Assets/Images/7.png')
                        : item == 'Martini'
                        ? require('../../Assets/Images/8.png')
                        : null
                    }>
                    <View style={styles.flatTextStyle}>
                      <Text numberOfLines={2} style={styles.flatText}>
                        {item}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>

          {/* Interest Section  */}
          <View style={styles.FavoriteTextView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'Interest'}
            />
          </View>

          {/* Interest FlatList  */}
          <View style={styles.favoritesFlatlistView}>
            {/* {console.log(nearMeUserData, '...')} */}
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              data={nearMeUserData?.user_interest}
              horizontal
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <View
                  style={{
                    margin: 10,
                  }}>
                  <ImageBackground
                    style={{width: 120, height: 120}}
                    resizeMode="contain"
                    imageStyle={{borderRadius: 5}}
                    source={
                      item == 'Tech'
                        ? require('../../Assets/Images/Tech.png')
                        : item == 'Food'
                        ? require('../../Assets/Images/Food.png')
                        : item == 'Animal'
                        ? require('../../Assets/Images/Animal.png')
                        : item == 'Art & Design'
                        ? require('../../Assets/Images/Art.png')
                        : item == 'Book'
                        ? require('../../Assets/Images/Book.png')
                        : item == 'Movie'
                        ? require('../../Assets/Images/Movies.png')
                        : item == 'Nature'
                        ? require('../../Assets/Images/Nature.png')
                        : item == 'Poetry'
                        ? require('../../Assets/Images/Poetry.png')
                        : null
                    }>
                    <View style={styles.flatTextStyle}>
                      <Text style={styles.flatText}>{item}</Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <View style={{height: 240}} />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = ({
  userReducer,
  usersNearmeReducer,
  messagesReducer,
}) => {
  return {userReducer, usersNearmeReducer, messagesReducer};
};
export default connect(mapStateToProps, actions)(ProfileScreen);

var styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: 'white',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: width * 0.4,
    height: height * 0.05,
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
  userProfilePic: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.4,
  },
  heartContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLike: {
    zIndex: 1,
    fontSize: 20,
    position: 'absolute',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoSection: {
    backgroundColor: themeRed,
    height: 500,
    bottom: 0,
    justifyContent: 'flex-end',
    marginTop: 400,
    // borderRadius: 15,
    flexDirection: 'column',
    borderTopRightRadius: 20,
  },
  ageAndNameView: {
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  noProfessions: {
    height: 2,
    backgroundColor: 'white',
    width: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  professionView: {
    justifyContent: 'flex-start',
    paddingLeft: 20,
    flexDirection: 'column',
  },
  professionInnerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
  },
  kilometerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  buttonsView: {
    justifyContent: 'flex-start',
    padding: 20,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  FavoriteTextView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  contentContainerStyle: {
    alignSelf: 'flex-start',
    margin: 5,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  flatTextStyle: {
    justifyContent: 'flex-end',
    height: 120,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  flatText: {
    textAlign: 'left',
    display: 'flex',
    textAlignVertical: 'bottom',
    padding: 5,
    color: 'white',

    fontFamily: 'Poppins-Bold',
    fontSize: hp('2%'),
  },
});

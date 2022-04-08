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
  Dimensions,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import {api, deploy_API} from '../../Config/Apis.json';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {imageUrl} from '../../Config/Apis.json';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as actions from '../../Store/Actions/index';
//  import {useNavigation} from "@react-navigation/native"

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({
  userReducer,
  navigation,
  unfriendUserFromProfile,
  route,
  usersNearmeReducer,
  cancelOfferFromProfile,
}) => {
  const [lines, onChangeLines] = React.useState(2);
  const [linesCondition, onChangeLinesCondition] = React.useState(false);
  const [earMeUserData, setNearMeUserData] = useState(null);
  const nearMeUserData = usersNearmeReducer?.user;
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
      friend: nearMeUserData.id,
    };
    console.log('cancelling ...');
    cancelOfferFromProfile(apiData);
  };

  const _onPressRemoveFriend = () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: nearMeUserData.id,
    };
    console.log('removing');
    unfriendUserFromProfile(apiData);
  };
  const requestFunction = () => {
    // request
    console.log('request');
  };

  const connectedFunction = () => {
    // unfollow
    console.log('unfollow');
  };

  const like = () => {
    console.log('like');
  };

  const unlike = () => {
    console.log('unlike');
  };

  const error = () => {
    console.log('Network Error');
  };

  useEffect(() => {
    if (
      usersNearmeReducer?.user !== null &&
      usersNearmeReducer?.user !== undefined
    ) {
      console.log('After Cancelling Request: Data Changed');
      console.log(usersNearmeReducer?.user);
      setNearMeUserData(usersNearmeReducer?.user);
    }
  }, [usersNearmeReducer?.user]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* User Profile Section  */}
      {nearMeUserData?.image === undefined ? (
        <Image
          style={styles.userProfilePic}
          source={require('./../../Assets/Images/dp.png')}
          resizeMode="cover"
          resizeMethod="auto"
        />
      ) : (
        <Image
          style={styles.userProfilePic}
          source={{uri: `${imageUrl}/${nearMeUserData?.image}`}}
          // resizeMode=""
          // resizeMethod="auto"
        />
      )}

      {/* Total Profile Likes  */}
      {/* <View style={styles.heartContainer}>
        <AntDesign name="heart" style={{padding: 2}} size={width * 0.1} color="red" />
        <Text style={styles.totalLike}>{nearMeUserData?.totalLike}</Text>
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
              Label={nearMeUserData?.name}
            />
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'26'}
              // Label={nearMeUserData?.age}
            />
          </View>

          {/* Profession View  */}
          <View style={styles.professionView}>
            {nearMeUserData?.profession != null &&
              nearMeUserData?.city != null && (
                <View style={styles.professionInnerView}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'Lecturer'}
                    // Label={nearMeUserData?.profession}
                  />
                  {(nearMeUserData?.profession != null ||
                    nearMeUserData?.city != null) && (
                    <View style={styles.noProfessions} />
                  )}
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'New York City'}
                    // Label={nearMeUserData?.city}
                  />
                </View>
              )}

            {/* Address View */}
            {nearMeUserData?.address != null && (
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
                  // Label={nearMeUserData?.address}
                />
              </View>
            )}

            {/* Kilometers Far Away  */}
            <View style={styles.kilometerView}>
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
            </View>
          </View>

          {/* Buttons View  */}
          <View style={styles.buttonsView}>
            {/* Connect Button  */}
            {nearMeUserData?.connected !== 'pending' && (
              <TouchableOpacity
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
                    nearMeUserData?.connected == 'null'
                      ? 'Offer A Drink'
                      : nearMeUserData?.connected == 'send'
                      ? 'Cancel Offer'
                      : 'Remove Friend'
                  }
                />
              </TouchableOpacity>
            )}
            <View style={{width: 10}} />

            {/* Like Button  */}
            {/* <TouchableOpacity
              onPress={
                likeStatus == false ? like : likeStatus == true ? unlike : error
              }
              // onPress={() => navigation.navigate('OfferADrink')}
              style={styles.touchableOpacity}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.4%')}
                color="black"
                Label={
                  likeStatus == false
                    ? 'Like'
                    : likeStatus == true
                    ? 'Liked'
                    : 'Error'
                }
              />
            </TouchableOpacity> */}
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
              data={nearMeUserData?.favorite}
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
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              data={nearMeUserData?.interest}
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

const mapStateToProps = ({userReducer, usersNearmeReducer}) => {
  return {userReducer, usersNearmeReducer};
};
export default connect(mapStateToProps, actions)(ProfileScreen);

var styles = StyleSheet.create({
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
    backgroundColor: '#EA2C2E',
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

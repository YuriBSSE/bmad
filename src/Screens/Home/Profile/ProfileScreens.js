import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  Animated,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../Components/AppText';
import MaterialIcons from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import PhoneInput from 'react-native-phone-number-input';
import * as actions from '../../../Store/Actions';
import {imageUrl} from '../../../Config/Apis.json';
import {connect} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import {themeRed} from '../../../Assets/Colors/Colors';
import {CountryCode, Country} from './src/types';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');

const data = [
  {key: 'A', image: require('../../../Assets/Images/post1.png')},
  {key: 'B', image: require('../../../Assets/Images/post2.png')},
  {key: 'C', image: require('../../../Assets/Images/post3.png')},
  {key: 'D', image: require('../../../Assets/Images/Animal.png')},
  {key: 'E', image: require('../../../Assets/Images/Tech.png')},
  {key: 'F', image: require('../../../Assets/Images/share1.png')},
  {key: 'G', image: require('../../../Assets/Images/share2.png')},
  {key: 'H', image: require('../../../Assets/Images/share2.png')},
  {key: 'I', image: require('../../../Assets/Images/share2.png')},
  {key: 'J', image: require('../../../Assets/Images/share1.png')},
  {key: 'K', image: require('../../../Assets/Images/share1.png')},
  {key: 'L', image: require('../../../Assets/Images/share1.png')},
  {key: 'M', image: require('../../../Assets/Images/post1.png')},
  {key: 'N', image: require('../../../Assets/Images/post1.png')},
  {key: 'O', image: require('../../../Assets/Images/Animal.png')},
  {key: 'P', image: require('../../../Assets/Images/post1.png')},
  {key: 'Q', image: require('../../../Assets/Images/Animal.png')},
  {key: 'R', image: require('../../../Assets/Images/post1.png')},
  {key: 'S', image: require('../../../Assets/Images/Animal.png')},
  {key: 'I', image: require('../../../Assets/Images/share2.png')},
  {key: 'J', image: require('../../../Assets/Images/share1.png')},
  {key: 'K', image: require('../../../Assets/Images/share1.png')},
  {key: 'L', image: require('../../../Assets/Images/share1.png')},
  {key: 'M', image: require('../../../Assets/Images/post1.png')},
  {key: 'N', image: require('../../../Assets/Images/post1.png')},
  {key: 'O', image: require('../../../Assets/Images/Animal.png')},
  {key: 'P', image: require('../../../Assets/Images/post1.png')},
  {key: 'Q', image: require('../../../Assets/Images/Animal.png')},
  {key: 'R', image: require('../../../Assets/Images/post1.png')},
  {key: 'S', image: require('../../../Assets/Images/Animal.png')},
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;
const imageHeight = 400;
const Data = [
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
];
const ProfileScreen = ({navigation, route, userReducer, updateProfile}) => {
  const [username, setUsername] = useState(userReducer?.data?.user_name);
  const [phone_no, setPhone_no] = useState(userReducer?.data?.user_contact);
  const phoneInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(
    userReducer?.data?.user_contact?.substring(
      3,
      userReducer?.data?.user_contact?.length,
    ),
  );
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <Image
            style={{height: 105, width: 105, borderRadius: 10}}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // console.log(userReducer, 'PROFILE SCREEN USERDATA');
  useEffect(() => {
    // console.log(navigation)
  }, []);

  let AnimatedHeaderValue = new Animated.Value(0);
  const Heade_Max = 550;
  const Header_Min = 150;

  const animatedHeaderBgColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, imageHeight],
    outputRange: ['black', '#B01125'],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
    // extrapolate:'extend',
  });

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [imageHeight + 20, 180],
    // extrapolate:'extend',
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  const animatedImageh = AnimatedHeaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  const animatedImagep = AnimatedHeaderValue.interpolate({
    inputRange: [90, 90],
    outputRange: [90, 90],
    extrapolateLeft: 'extend',
    extrapolateRight: 'identity',
    extrapolate: 'clamp',
  });

  const animatedImagew = AnimatedHeaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });
  const ID = userReducer?.data?.user_id;

  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [imageObject, setImageObject] = useState(null);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
        console.log(image);
      setImageObject(image);
      setImage(`data:${image?.mime};base64,${image?.data}`);
    });
  };

  const updateProfileChanges = async () => {
    const data = {
      user_name: username,
      user_contact: phone_no,
      user_id: ID,
      user_lives: country,
      user_image: image,
      imageObj: imageObject,
    };

    if (username && country && phone_no) {
      setLoading(true);
      await updateProfile(data,  _onSuccess, _onFailed);
    } else {
      showMessage({
        message: 'All fields are required!',
        // description: 'Invalid Credentials.',
        danger: 'error',
      });
    }
  };
  const _onSuccess = () => {
    setLoading(false);
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    });
    // navigation.goBack();
  };

  const _onFailed = () => {
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openGallery}
        style={styles.iconContainer}>
        {/* <IconComp
                type={'FontAwesome'}
                name="edit"
                iconStyle={{fontSize: width * 0.08, marginLeft: 4}}
              /> */}

        <MaterialIcons name="edit-3" color="white" size={25} style={{}} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.imagebackground,
          {
            height: animatedHeaderHeight,
          },
        ]}>
        {image !== null ||
        image !== undefined ||
        userReducer?.data?.user_image !== null ||
        userReducer?.data?.user_image !== '' ||
        userReducer?.data?.user_image !== undefined ? (
          <Animated.Image
            style={[
              styles.imagebackground,
              {
                height: animatedHeaderHeight,
                backgroundColor: animatedHeaderBgColor,
              },
            ]}
            resizeMode="cover"
            source={{
              uri: image
                ? image
                : `${imageUrl}/${userReducer?.data?.user_image}`,
            }}
          />
        ) : (
          <Animated.Image
            style={[
              styles.imagebackground,
              {
                height: animatedHeaderHeight,
                backgroundColor: animatedHeaderBgColor,
              },
            ]}
            resizeMode="cover"
            source={require('../../../Assets/Images/test.png')}
          />
        )}

        <Animated.View style={styles.image}>
          {/* <View
            style={{borderRadius: 100, borderWidth: 2, borderColor: 'white'}}>
            <Animated.Image
              style={[
                {
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  // backgroundColor: 'black',
                },
                {
                  height: animatedImageh,
                  width: animatedImagew,
                },
              ]}
              source={
                userReducer?.data?.user_image
                  ? {uri: `${imageUrl}/${userReducer?.data?.user_image}`}
                  : require('./../../../Assets/Images/maroon-dp2.jpeg')
              }
            />
          </View> */}

          <Animated.View
            style={[
              styles.contentbellowImage,
              {
                height: animatedImagep,
              },
            ]}>
            {/* <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <AppText
                nol={2}
                textAlign="center"
                family="Poppins-Medium"
                size={hp('2%')}
                color="white"
                Label={'Posts'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <MaterialCommunityIcons
                  name="image-multiple"
                  color="white"
                  size={20}
                  style={{top: 0, right: 5}}
                />
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Medium"
                  size={hp('1.5%')}
                  color="white"
                  Label={'80'}
                />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <AppText
                nol={2}
                textAlign="center"
                family="Poppins-Medium"
                size={hp('2%')}
                color="white"
                Label={'Connects'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <FontAwesome5
                  name="users"
                  color="white"
                  size={20}
                  style={{top: 0, right: 5}}
                />
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Medium"
                  size={hp('1.5%')}
                  color="white"
                  Label={'220'}
                />
              </View>
            </View> */}
            {/* Icon Edit Profile  */}

            <View style={styles.textContainer}>
              <Text
                style={
                  styles.nameStyles
                }>{`${userReducer?.data?.user_name}`}</Text>
              <Text style={styles.emailStyles}>
                {userReducer?.data?.user_email}
              </Text>
            </View>

            {/* <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-Medium"
                size={hp('2%')}
                color="white"
                Label={'Likes'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Ionicons
                  name="heart"
                  color="white"
                  size={20}
                  style={{top: 0, right: 5}}
                />
                <AppText
                  nol={1}
                  textAlign="center"
                  family="Poppins-Medium"
                  size={hp('1.5%')}
                  color="white"
                  Label={'1.5K'}
                />
              </View>
            </View> */}
          </Animated.View>

          {/* <Animated.View
            style={[
              styles.upperImage,
              {
                height: animatedImagep,
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <AppText
                nol={2}
                textAlign="center"
                family="Poppins-Medium"
                size={hp('2%')}
                color="white"
                Label={userReducer?.data?.user_name}
              />
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Medium"
                size={hp('1.7%')}
                color="white"
                Label={userReducer?.data?.user_title}
              />
            </View>
          </Animated.View> */}
        </Animated.View>
      </Animated.View>
      {/* </ImageBackground> */}

      {/* </Animated.View> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: AnimatedHeaderValue,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        {/* <View style={{paddingTop: 10}}></View> */}
        <View style={styles.formView}>
          <Text style={styles.formLabelStyle}>Username</Text>
          <TextInput
            value={username}
            onChangeText={e => setUsername(e)}
            style={styles.textInputLabel}
          />
          <Text style={styles.formLabelStyle}>Phone Number</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            placeholder="Phone"
            containerStyle={styles.phoneInputContainerStyle}
            textInputStyle={styles.phoneInputTextStyle}
            codeTextStyle={styles.codeTextStyle}
            textContainerStyle={styles.textContainerStyle}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setPhone_no(text);
            }}
          />

          <Text style={styles.formLabelStyle}>Country</Text>

          <CountryPicker
            containerButtonStyle={[
              styles.textInputLabel,
              {padding: height * 0.02, color: 'black'},
            ]}
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={showCountryPicker}
            onSelect={t => setCountry(t.name)}
          />
          {/* <TouchableOpacity
            onPress={() => setShowCountryPicker(true)}
            style={{
              // backgroundColor: 'red',
              width: width * 0.7,
              marginTop: -40,
              marginLeft: 70,
            }}> */}
          <Text
            style={{
              width: width * 0.7,
              marginTop: -40,
              marginLeft: 70,
              color: 'black',
              fontSize: width * 0.04,
              fontFamily: 'Poppins-Medium',
            }}>
            {country}
          </Text>
          {/* </TouchableOpacity> */}

          {loading ? (
            <View style={styles.updateBtnStyle}>
              <Text style={styles.btnTxt}>Updating..</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={updateProfileChanges}
              style={styles.updateBtnStyle}>
              <Text style={styles.btnTxt}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
          {useNativeDriver: false},
        )}> */}
      {/* Input Fields  */}

      {/* </ScrollView> */}
      {/* <FlatList
        data={formatData(data, numColumns)}
        renderItem={renderItem}
        numColumns={numColumns}
        scrollEnabled
        ListHeaderComponent={
          <View
            style={{
              width: '95%',
              padding: 10,
              left: 10,
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Ionicons
                name="md-mail"
                color="#B01125"
                size={20}
                style={{top: 0, right: 5}}
              />
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="black"
                Label={userReducer?.data?.user_email}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Ionicons
                name="home"
                color="#B01125"
                size={20}
                style={{top: 0, right: 5}}
              />
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="black"
                Label={`Lives in ${userReducer?.data?.user_lives}`}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Ionicons
                name="ios-heart-sharp"
                color="#B01125"
                size={20}
                style={{top: 0, right: 5}}
              />
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="black"
                Label={userReducer?.data?.user_relation}
              />
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <Ionicons
                name="ios-information-circle"
                color="#B01125"
                size={20}
                style={{top: 0, right: 5}}
              />
              <AppText
                nol={3}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="black"
                Label={userReducer?.data?.user_bio}
              />
            </View>
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
          {useNativeDriver: false},
        )}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{width: '90%', alignSelf: 'center'}}
      /> */}
      <View style={{height: '37%'}} />
    </SafeAreaView>
  );
};

function mapStateToProps({userReducer}) {
  return {userReducer};
}
export default connect(mapStateToProps, actions)(ProfileScreen);

var styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: height * 0.08,
    right: width * 0.03,
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imageStyles: {
    width: width,
    height: height * 0.5,
    borderBottomRightRadius: width * 0.15,
  },
  textContainer: {
    // position: 'absolute',
    // top: height * 0.38,
    // left: width * 0.05,
    paddingHorizontal: width * 0.03,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    zIndex: 9999999,
  },
  nameStyles: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.07,
    textTransform: 'capitalize',
  },
  emailStyles: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
    marginTop: height * -0.01,
  },
  contentbellowImage: {
    // justifyContent: 'space-between',
    // width: 200,
    // backgroundColor:'red',
    right: width * 0.26,
    alignItems: 'center',
    flexDirection: 'row',
    top: height * 0.28,
  },
  upperImage: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    top: 20,
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    zIndex: 1,
    top: -300,
  },
  imagebackground: {
    height: imageHeight,
    width: '100%',
    opacity: 0.85,
    //  borderWidth: 2,
    //  borderColor: 'white'
  },
  container: {
    // height: hp('103%'),
    // backgroundColor: 'white',
    backgroundColor: themeRed,
  },

  btnTxt: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
  },
  updateBtnStyle: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: themeRed,
    width: width * 0.4,
    alignSelf: 'center',
    height: height * 0.07,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.045,
    elevation: 9,
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('100%'),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    bottom: 20,
    marginTop: 10,
  },
  touchableOpacity1: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('29%'),
    height: hp('4%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    elevation: 4,
    zIndex: 999,
  },
  container2: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: -4,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },

  formView: {
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.15,
    // backgroundColor: 'red',
    backgroundColor: themeRed,
  },
  formLabelStyle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    backgroundColor: themeRed,
    marginVertical: height * 0.01,
  },
  textInputLabel: {
    borderColor: 'white',
    backgroundColor: 'white',
    width: width * 0.9,
    fontFamily: 'Poppins-Medium',
    borderRadius: width * 0.3,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.05,
    elevation: 20,
  },
  phoneInputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 50,
    color: 'black',
    height: height * 0.0755,
    width: width * 0.9,
  },
  phoneInputTextStyle: {
    color: 'black',
    height: height * 0.07,
    paddingVertical: 0,
  },
  codeTextStyle: {
    color: 'black',
  },
  textContainerStyle: {
    color: 'black',
    borderRadius: 50,
  },
});

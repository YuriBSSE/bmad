import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppText from '../../Components/AppText';
import {imageUrl} from '../../Config/Apis.json';
import {themeRed} from '../../Assets/Colors/Colors';
import * as actions from '../../Store/Actions/index';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ConnectionsMapper = ({
  item,
  index,
  navigation,
  unFriendThisPerson,
  _onPressCancelMyRequestSent,
  saveNearmeUserData,
  userReducer,
}) => {
  // console.log(navigation,"----")
  const userInfo = {
    image: item?.user_image,
    name: item?.user_name,
    age: item?.user_age,
    profession: item?.user_title,
    status: item?.user_status,
    city: item?.user_lives,
    interest: item?.user_interest,
    favorite: item?.user_favorite,
    distance: item?.distance,
    navigation: navigation,
    relation: item?.user_relation,
    address: item?.user_address,
    genderInterest: item?.user_gender_interest,
    email: item?.user_email,
    connected: item?.connected,
    totalLike: item?.like,
    like: item?.is_like,
    id: item?.user_id,
    userId: userReducer?.data?.user_id,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          saveNearmeUserData(userInfo);
          navigation.navigate('profile');
        }}>
        <Image
          source={{uri: `${imageUrl}/${item.user_image}`}}
          style={{
            width: width * 0.16,
            height: height * 0.09,
            borderRadius: width * 0.1,
          }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={height * 0.018}
          color={themeRed}
          Label={item?.user_name}
        />
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-Regular"
          size={height * 0.017}
          color={'grey'}
          Label={'22 years old'}
        />
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-Regular"
          size={height * 0.017}
          color={'black'}
          Label={item?.user_gender}
        />
      </View>
      {
        <View style={styles.btnContainer}>
          {item?.status === 'pending' && (
            <>
              <TouchableOpacity activeOpacity={0.7} style={styles.connectBtn}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={height * 0.015}
                  color={'white'}
                  Label={'Accept'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ignorebtn} activeOpacity={0.7}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={height * 0.015}
                  color={'white'}
                  Label={'Ignore'}
                />
              </TouchableOpacity>
            </>
          )}

          {item?.connected === 'accepted' && (
            <TouchableOpacity
              style={styles.ignorebtn}
              activeOpacity={0.7}
              onPress={() => unFriendThisPerson(item)}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={height * 0.015}
                color={'white'}
                Label={'Unfriend'}
              />
            </TouchableOpacity>
          )}

          {item?.status === 'send' && (
            <TouchableOpacity
              style={styles.ignorebtn}
              activeOpacity={0.7}
              onPress={() => _onPressCancelMyRequestSent(item)}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={height * 0.015}
                color={'white'}
                Label={'Cancel'}
              />
            </TouchableOpacity>
          )}
        </View>
      }
    </View>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(ConnectionsMapper);

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: 'white',
    paddingVertical: height * 0.03,
    // paddingHorizontal: width * 0.025,
    marginHorizontal: width * 0.05,
    // marginVertical: height * 0.005,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  textContainer: {
    width: width * 0.5,
    marginLeft: width * 0.03,
  },
  connectBtn: {
    backgroundColor: themeRed,
    borderRadius: width * 0.015,
    width: width * 0.2,
    paddingVertical: height * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ignorebtn: {
    backgroundColor: themeRed,
    borderRadius: width * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.008,
    width: width * 0.2,
    paddingVertical: height * 0.005,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
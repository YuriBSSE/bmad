import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppText from '../../Components/AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NearMeList = ({
  Img,
  Name,
  Age,
  Profession,
  Status,
  City,
  Interest,
  Favorite,
  Distance,
  Navigation,
  Relation,
  Address,
  GenderInterest,
  Email,
  Connect,
  TotalLike,
  Like,
  Id,
  UserID,
}) => {
  const userInfo = {
    image: Img,
    name: Name,
    age: Age,
    profession: Profession,
    status: Status,
    city: City,
    interest: Interest,
    favorite: Favorite,
    distance: Distance,
    navigation: Navigation,
    relation: Relation,
    address: Address,
    genderInterest: GenderInterest,
    email: Email,
    connect: Connect,
    totalLike: TotalLike,
    like: Like,
    id: Id,
    userId: UserID,
  };
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '48%',
        backgroundColor: 'white',
        zIndex: 1,
        elevation: 3,
        margin: 5,
        height: 250,
      }}>
      <TouchableOpacity onPress={() => Navigation.push('profile', userInfo)}>
        <View style={{margin: 0}}>
          {Img == '' ? (
            <Image
              source={require('../../Assets/Images/placeholderImage.jpg')}
              resizeMode="contain"
              style={{height: 150, width: 160}}
            />
          ) : Img?.includes('ngrok') ? (
            <Image
              source={require('../../Assets/Images/placeholderImage.jpg')}
              resizeMode="contain"
              style={{height: 150, width: 160}}
            />
          ) : (
            <Image
              source={{uri: Img}}
              resizeMode="stretch"
              style={{height: 150, width: 160}}
            />
          )}
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'column',
            padding: 10,
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <AppText
            nol={2}
            textAlign="left"
            family="Poppins-SemiBold"
            size={hp('2%')}
            color="black"
            Label={Name}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              width: 140,
            }}>
            {Profession ? (
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.5%')}
                color="grey"
                Label={Profession}
              />
            ) : null}
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('1.2%')}
              color="black"
              Label={Distance.toPrecision(2) + ' km' + '  Far away'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default NearMeList;

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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import {api, deploy_API} from "../../Config/Apis.json"
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
//  import {useNavigation} from "@react-navigation/native"

const ProfileScreen = ({navigation, route}) => {
  console.log("Profile SCREEN-===---")
  // const [Data, onChangeData] = React.useState(route.params);
  // const navigation=useNavigation()
  const [lines, onChangeLines] = React.useState(2);
  const [linesCondition, onChangeLinesCondition] = React.useState(false);
  const [likeStatus, onChangeLikeStatus] = React.useState(route.params.like)
  const [connect, onChangeConnect] = React.useState(route.params.connect)
  // const [interest, onChangeInterest] = React.useState([])
  console.log(route.params.connect, "CONNECT STATUS")
  console.log(route.params.like, "LIKE STATUS")
  useEffect(() => {
    const checklikeStatus = async () => {

      await axios.get(`${deploy_API}/api/user/userstatus`,{
        
          user_id:route.params.userId,
          like_by :route.params.id
      
      }).then((res)=>{
          if(res.data.status){
            console.log(res.data.like_status, " API LIKE STATUS")
            onChangeLikeStatus(res.data.like_status)
          }
      }).catch((err)=>{
        console.log(err, "ERROR LIKE STATUS")
      })
    }
    const checkConnectStatus = async () => {
      console.log(route.params.userId, "USER ID", route.params.id, "followingto" )
      await axios.get(`${deploy_API}/api/user/followstatus`,{
        
          user_id:route.params.userId,
          following_to :route.params.id
      
      }).then((res)=>{
        console.log(res.data, "API RESPONSE")
        console.log(res.data.follow_status, " API CONNECT STATUS")
          if(res.data.status){
            onChangeConnect(res.data.follow_status)
          }
      }).catch((err)=>{
        console.log(err, "ERROR CONNECT STATUS")
      })
    }
    // checklikeStatus()
    checkConnectStatus()

  }, []);

  // const connect = async () => {
  //     await axios.post
  // }


  const ReadMore = () => {
    onChangeLines(20);
    onChangeLinesCondition(true);
  };
  const ShowLess = () => {
    onChangeLines(2);
    onChangeLinesCondition(false);
  };

  const connectFunction = async () => {
    // follow
    console.log("USER ID: "+ route.params.userId, "FOLLOW ID: "+ route.params.id)
     await axios.post(`${deploy_API}/api/user/follow`,{
      user_id:route.params.userId,
      follow_id:route.params.id,
      status: 2
      }).then((res)=>{
        console.log(res.data)
          if(res.data.status){
              // if(res.data.follow_status == 1){
                  onChangeConnect(res.data.follow_status)
              // }
            // onChangeConnect(res.data.follow_status)
          }
      }).catch((err)=>{
        console.log(err, "FOLLOW")
      })
    // console.log('follow')
  }

  const requestFunction = () => {
    // request
    console.log('request')
  }

  const connectedFunction = () => {
    // unfollow
    console.log('unfollow')
  }

  const like = () => {
    console.log('like')
  }

  const unlike = () => {
    console.log('unlike')
  }

  const error = () => {
    console.log('Network Error')
  }


  // console.log(route.params);
  // const [image] = route.params
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
    
      {route.params.image.includes('ngrok') ? (
        <Image
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 400,
          }}
          source={require('./../../Assets/Images/dp.png')}
          resizeMode="cover"
          resizeMethod="auto"
        />
      ) : route.params.image == '' ? (
        <Image
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 400,
          }}
          source={require('./../../Assets/Images/dp.png')}
          resizeMode="cover"
          resizeMethod="auto"
        />
      ) : (
        <Image
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 400,
          }}
          source={{uri: route.params.image}}
          resizeMode="cover"
          resizeMethod="auto"
        />
      )}
    <View style={{position: 'absolute', top: 10, right: 10, zIndex: 1,alignItems:'center', justifyContent:'center'}}>
         <AntDesign name="heart" style={{padding: 2}} size={50} color="red" />
              {/* <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={hp('1.4%')}
                  color="white"
                  Label={route.params.totalLike}
                /> */}
                <Text style={{zIndex: 1, fontSize:20, position:'absolute', color: 'white', fontFamily:'Poppins-SemiBold'}}>{route.params.totalLike}</Text>
           
    </View>
      <View
        style={{
          backgroundColor: '#EA2C2E',
          height: 500,
          bottom: 0,
          justifyContent: 'flex-end',
          marginTop: 400,
          // borderRadius: 15,
          flexDirection: 'column',
          borderTopRightRadius: 20,
        }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          
          <View
            style={{
              justifyContent: 'space-between',
              padding: 20,
              flexDirection: 'row',
            }}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={route.params.name}
            />
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={route.params.age}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingLeft: 20,
              flexDirection: 'column',
            }}>
            {
                route.params.profession != null && route.params.city != null ? 
                <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={hp('2%')}
                  color="white"
                  Label={route.params.profession}
                />
                {route.params.profession != null || route.params.city != null ? (
                  <View
                    style={{
                      height: 2,
                      backgroundColor: 'white',
                      width: 14,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  />
                ) : null}
                {/* <View style={{height: 2, backgroundColor:'white', width: 14, marginLeft: 5, marginRight: 5,}}/> */}
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={hp('2%')}
                  color="white"
                  Label={route.params.city}
                />
              </View>  :null
            }
       
            {route.params.address != null ? (
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  width: '90%',
                }}>
                <AppText
                  nol={3}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2%')}
                  color="white"
                  Label={route.params.address}
                />
                {/* <View style={{height: 2, backgroundColor:'white', width: 14, marginLeft: 5, marginRight: 5,}}/> */}
                {/* <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("2%")} color="white" Label={parseFloat(route.params.distance).toFixed(2)+ ' Km'} /> */}
              </View>
            ) : null}

            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              {/* <AppText  nol={3}  textAlign="left"  family="Poppins-SemiBold" size={hp("2%")} color="white" Label={route.params.address} /> */}
              {/* <View style={{height: 2, backgroundColor:'white', width: 14, marginLeft: 5, marginRight: 5,}}/> */}
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.5%')}
                color="white"
                Label={parseFloat(route.params.distance).toFixed(2) + ' Km far away'}
              />
            </View>
          </View>
          {/* <View style={{justifyContent:'flex-start', padding: 20, flexDirection:'column'}}>
                                        <AppText  nol={lines}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.5%")} color="white" Label={route.params.status} />
                                        {
                                            !linesCondition ?
                                            <TouchableOpacity style={{top: 5}} onPress={()=> ReadMore()}>
                                                <AppText nol={1} textAlign="left" family="Poppins-SemiBold" size={hp("1.5%")} color="white" Label={"Read More"} />
                                            </TouchableOpacity>:
                                            (
                                            <TouchableOpacity style={{top: 5}} onPress={()=> ShowLess()}>
                                                <AppText nol={1} textAlign="left" family="Poppins-SemiBold" size={hp("1.5%")} color="white" Label={"Show Less"} />
                                            </TouchableOpacity>
                                            )
                                        } 
                                    </View> */}
          <View
            style={{
              justifyContent: 'flex-start',
              padding: 20,
              flexDirection: 'row',
              alignContent: 'space-around',
            }}>
            <TouchableOpacity
              disabled={connect == 2 ? true : false}
              onPress={
                connect == 0 ? connectFunction :
                connect == 2 ? requestFunction :
                connect == 1 ? connectedFunction : error
              }
              style={styles.touchableOpacity}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.4%')}
                color="black"
                Label={
                  connect == 0 ? 'Connect' :
                  connect == 2 ? 'Requested' :
                  connect == 1 ? 'Connected' : 'Error'
              }
              />
            </TouchableOpacity>
            <View style={{width: 10}} />
            <TouchableOpacity
             onPress={
              likeStatus == false ? like :
              likeStatus == true ? unlike : error
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
                  likeStatus == false ? 'Like' :
                  likeStatus == true ? 'Liked' : 'Error'
                }
              />
              {/* <View style={{ padding: 2, backgroundColor:'red', left: 5, borderRadius:5}}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={hp('1.4%')}
                  color="white"
                  Label={route.params.totalLike}
                />
              </View> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'Favourites'}
            />
          </View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            {console.log(route.params.favorite)}
            <FlatList
              contentContainerStyle={{
                alignSelf: 'flex-start',
                margin: 5,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}
              showsHorizontalScrollIndicator={false}
              data={route.params.favorite}
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
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        height: 120,
                        alignItems: 'flex-start',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          textAlign: 'left',
                          display: 'flex',
                          textAlignVertical: 'bottom',
                          padding: 5,
                          color: 'white',

                          fontFamily: 'Poppins-Bold',
                          fontSize: hp('2%'),
                        }}>
                        {item}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={'Interest'}
            />
          </View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <FlatList
              contentContainerStyle={{
                alignSelf: 'flex-start',
                margin: 5,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}
              showsHorizontalScrollIndicator={false}
              data={route.params.interest}
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
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        height: 120,
                        alignItems: 'flex-start',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          display: 'flex',
                          textAlignVertical: 'bottom',
                          padding: 5,
                          color: 'white',
                          fontFamily: 'Poppins-Bold',
                          fontSize: hp('2%'),
                          zIndex: 1,
                        }}>
                        {item}
                      </Text>
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
export default ProfileScreen;

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
    width: wp('30%'),
    height: hp('4%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection:'row'
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
});

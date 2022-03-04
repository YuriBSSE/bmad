import React, {useState, useEffect} from 'react';
import AuthRootStackScreen from './AuthRootStackScreen';
import {connect} from 'react-redux';
import * as actions from './Store/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import MainAppScreens from './InApp';

const Main = ({userLogin, userAuthSignUp, nearMeUsers, userGet}) => {
  const [token, onChangeToken] = useState(null);
  useEffect(() => {
    console.log();
    try {
      async function GetToken() {
        let Token = await AsyncStorage.getItem('token');
        if (Token) {
          console.log(Token, 'Data OF USER');
          if (userLogin?.data?.id) {
            // alert("SADAD")
            userGet(userLogin.data.id);
          }
          // console.log(Token.Token, 'Token OF USER')
          onChangeToken(Token);
        }
      }
      GetToken();
    } catch (error) {
      console.log(error);
    }
    //   if(userLogin?.data?.id){
    //     userGet(userLogin.data.id)
    //     console.log(userLogin.data.id, "MAIN SCREEN")
    //     nearMeUsers(coords.latitude, coords.longitude, userLogin.data.id)
    //   }
    //   console.log(userLogin?.data?.id, "MAIN SCREEN")
    //   console.log(coords, "COORDINATE MAIN SCREEN")
  }, [userLogin]);

  // useEffect(()=>{
  //   if(userLogin?.data?.id){
  //     userGet(userLogin.data.id)
  //     console.log(userLogin.data.id, "MAIN SCREEN")
  //   }
  //   console.log(userLogin?.data?.id, "MAIN SCREEN")

  // },[])

  useEffect(() => {
    console.log(userAuthSignUp, 'MAIN userAuthSignUp');
    // if()
    onChangeToken(userAuthSignUp.token);
    // if(userAuthSignUp){
    //   console.log(userAuthSignUp, "userAuthSignUp")
    //   //  onChangeToken()
    // }else{
    //   onChangeToken(null)
    // }
  }, [userAuthSignUp]);
  // if(userLogin.token ||  token){
  //   return(
  //     <View style={{justifyContent:'center', flex: 1, alignItems:'center'}}>
  //       <ActivityIndicator size={40} color="red"/>
  //     </View>
  //   )
  // }

  return (
    <>
      {userLogin.token || token ? (
        <MainAppScreens />
      ) : (
        <NavigationContainer>
          <AuthRootStackScreen />
        </NavigationContainer>
      )}
    </>
  );
};
const mapStatetoProps = ({userLogin, userAuthSignUp}) => {
  return {userLogin, userAuthSignUp};
};
export default connect(mapStatetoProps, actions)(Main);

// {
//   userLogin.token ||  token ?
//   <AuthRootStackScreen/> : (
//     <NavigationContainer>
//          <MainAppScreens />
//     </NavigationContainer>
//   )
// }

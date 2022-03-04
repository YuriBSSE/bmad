import axios from 'axios';
import {api, deploy_API} from '../../Config/Apis.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from './actionType';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const postAction =
  (tags, capton, images, id, navigation) => async dispatch => {
    var bodyFormData = new FormData();
    // if(images){
    //     images.forEach((item, i) => {
    //         bodyFormData.append("post_file", {
    //           uri: item.uri,
    //           type: "image/jpeg",
    //           name: item.filename || `filename${i}.jpg`,
    //         });
    //       });
    // }
    bodyFormData.append('user_id', id);
    bodyFormData.append('post_title', 'tags');
    bodyFormData.append('post_desc', capton);
    // bodyFormData.append("post_file", {
    //     uri: images[0].uri,
    //     name: images[0].fileName,
    //     type: images[0].type,
    //   });

    console.log(bodyFormData);
    try {
      const response = await axios({
        method: 'post',
        url: `${api}/api/post/createpostmulti`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.data.status) {
        navigation.navigate('home');
        showMessage({
          message: 'Post Create Successfully',
          description: '',
          type: 'success',
        });
      }
      // const response = await axios.post(`${api}/api/post/createPost`,{
      //     user_id:16,
      //     post_title:"asdas",
      //     post_desc:"okay creat",
      //     post_file: null
      // });
    } catch (err) {
      console.log(err);
    }
  };

export const userGet = userID => async dispatch => {
  try {
    // console.error(userID, "USER GET")
    const response = await axios.get(`${api}/api/auth/userInfo`, {
      params: {
        user_id: userID,
      },
    });

    // console.log(response.data.data)"user_latitude": "24.7931192", "user_lives": "Karachi", "user_longitude": "67.0665601"
    if (response.data.status) {
      // console.log(" USER DATA ======ACTION======")
      // alert("SADSAD")
      const userData = JSON.stringify(response.data.data);
      await AsyncStorage.setItem('user', userData);
      dispatch({
        type: types.USER_GET_INFO,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Error',
        description: 'AUTH Error',
        danger: 'error',
      });
      // alert("error")
    }
  } catch (error) {
    showMessage({
      message: 'Error',
      description: 'AUTH Error',
      danger: 'error',
    });
    console.log(error);
  }
};

export const nearMeUsers = (latitude, longitude, userId) => async dispatch => {
  console.log(
    latitude,
    longitude,
    userId,
    'nearMeUsers API CALL ++++++++++++++++++++++',
  );
  // 24.7929056,67.0631794
  // params: {
  //     kilometers:5,
  //     user_latitude:24.7929056,
  //     user_longitude:67.0631794
  // }
  try {
    dispatch({
      type: types.USER_COORDS,
      payload: {
        lat: 24.7929056,
        long: 67.0631794,
      },
    });

    const location = await axios.get(`${api}/api/post/nearMe`, {
      params: {
        kilometers: 10,
        user_latitude: 24.7929056,
        user_longitude: 67.0631794,
        user_id: userId,
      },
    });
    // console.log(location.data, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
    if (location.data.length > 0) {
      // console.log(location.data)
      dispatch({
        type: types.NEAR_ME_USERS,
        payload: location.data,
      });
    } else {
      showMessage({
        message: 'Error',
        description: 'no user detected',
        danger: 'error',
      });
      dispatch({
        type: types.NO_NEAR_ME_USERS,
        payload: [],
      });
    }
  } catch (err) {
    showMessage({
      message: 'Error',
      description: '',
      danger: 'error',
    });
    console.log(err, 'ERROR nearMeUser');
  }
};

export const loginUser = (email, password) => async dispatch => {
  try {
    // console.log(email, password)
    const response = await axios.post(`http://83da-110-93-244-255.ngrok.io/api/auth/login`, {
      email: email,
      password: password,
    });

    if (response.data.status) {
      // console.log(response.data)
      console.log('success');
      dispatch({
        type: types.AUTH_LOGGED_IN,
        payload: {
          token: response.data.data.Token,
          data: response.data.data,
        },
      });
      const token = response.data.data.token;
      const userData = JSON.stringify(response.data.data.id);
      console.log(token, 'LOGIN TOKEN');
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userData', userData);
    } else {
      showMessage({
        message: 'Error',
        description: 'INVALID Credential',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    console.log("Login Failed", error);
  }
};

export const Otp = (otp, number, fadeChange) => async dispatch => {
  try {
    // console.log(otp)
    if (otp != null) {
      const responseVerify = await axios.get(`${api}/api/auth/verify`, {
        params: {
          phonenumber: number,
          code: otp,
        },
      });
      // console.log(responseVerify.data)
      if (responseVerify.data.message === 'User is Verified!!') {
        dispatch({
          type: types.AUTH_OTP_VERIFY,
          payload: responseVerify.data,
        });
        fadeChange();
      } else {
        showMessage({
          message: 'Error',
          description: 'Wrong OTP',
          danger: 'error',
        });
        // alert("error")
      }
    } else {
      console.log(number, 'ACTION');
      // let payload = { phonenumber: number, channel: 'sms' };
      const response = await axios.get(`${api}/api/auth/otp`, {
        params: {
          phonenumber: number,
          channel: 'sms',
        },
      });
      console.log('OTP API RESPONSE');
      if (response.data.message === 'Verification is sent!!') {
        // console.log(response.data.message)
        fadeChange();
        dispatch({
          type: types.AUTH_OTP,
          payload: response.data,
        });
      } else {
        showMessage({
          message: 'Error',
          description: 'Verification Failed',
          danger: 'error',
        });
        // alert("error")
      }
    }
  } catch (err) {
    console.log(err, 'ERROR OTP');
  }
};

export const SignUpStepOne =
  (username, email, phoneNumber, password, obj, gender, otp, navigation) =>
  async dispatch => {
    console.log(username, email, phoneNumber, password, obj, gender, otp);
    try {
      const data = {
        user_name: username,
        user_email: email,
        user_password: password,
        user_contact: phoneNumber,
        user_reg_verify_code: otp,
        user_gender: gender,
        user_gender_interest: obj,
      };

      navigation.navigate('YourInterests');
      dispatch({
        type: types.AUTH_SIGNUP,
        payload: data,
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed',
        danger: 'error',
      });
      console.log(error);
    }
  };

export const SignOut = () => async dispatch => {
  console.log('sign out');
  try {
    await AsyncStorage.clear();
    dispatch({
      type: types.AUTH_LOGOUT,
      payload: {
        token: null,
        data: null,
      },
    });
    // await AsyncStorage.removeItem('token')
    // await AsyncStorage.removeItem('userData')
  } catch (error) {
    console.log(error);
  }
};

export const Interest = interest => async dispatch => {
  try {
    // console.log(interest, "--int--")
    dispatch({
      type: types.USER_INTEREST,
      payload: interest,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Favourite = favourite => async dispatch => {
  try {
    // console.log(favourite, "--fav--")
    dispatch({
      type: types.USER_FAVOURITE,
      payload: favourite,
    });
  } catch (error) {
    console.log(error);
  }
};

// {"user_contact": "923488300016",
// "user_email": "ahsanmuneer81@gmail.com",
// "user_gender": "female",
// "user_gender_interest": {"female": true, "male": true}
// "user_name": "ahsanmuneer81",
// "user_password": "ahsan12345",
// "user_reg_verify_code": "9890"}
// ["Old Fashioned", "Margarita", "Mimosa", "Dark & Stormy"]
// ["Tech", "Food", "Art & Design", "Animal"]

export const coords = (lat, long) => async dispatch => {
  console.log(lat, long, 'coords  ++++++++++++++++++++++');
  dispatch({
    type: types.USER_COORDS,
    payload: {
      lat: 24.7929056,
      long: 67.0631794,
    },
  });
};

export const SignupAll =
  (userSignup, userFavourite, userInterest) => async dispatch => {
    try {
      console.log(userSignup.user_gender_interest, '-----');
      // console.log(userInterest, "-----")
      // const intgend = [userSignup.user_gender_interest.male, userSignup.user_gender_interest.female]
      const response = await axios.post(`${deploy_API}/api/auth/register`, {
        user_name: userSignup.user_name,
        user_email: userSignup.user_email,
        user_password: userSignup.user_password,
        user_contact: userSignup.user_contact,
        user_reg_verify_code: userSignup.user_reg_verify_code,
        user_gender: userSignup.user_gender,
        user_gender_interest: JSON.stringify(userSignup.user_gender_interest),
        user_interest: JSON.stringify(userInterest),
        user_favorite: JSON.stringify(userFavourite),
        social_login: 'USER_AUTH',
      });
      console.log(response.data);
      if (response.data.status) {
        dispatch({
          type: types.AUTH_ALL_SIGNUP,
          payload: {
            token: response.data.data.token,
            data: response.data.data,
          },
        });
        const token = response.data.data.token;
        const userData = response.data.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userData', userData);
      }
      // console.log(favourite, "--fav--")
      // dispatch({
      //     type: types.USER_FAVOURITE,
      //     payload: favourite
      // })
    } catch (error) {
      console.log(error);
    }
  };
// const loginSuccess = user => ({
//     type: types.AUTH_LOGGED_IN,
//     user
//   });

// const loginFail = error => ({
//     type: types.AUTH_LOGGING_IN_ERROR,
//     error
//   });

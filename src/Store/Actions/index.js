import axios from 'axios';
import {api, deploy_API} from '../../Config/Apis.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from './actionType';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const postAction =
  (caption, images, id, navigation, clearAllStates, _onPostFailed) =>
  async dispatch => {
    console.log(
      'API DATA: ',
      id,
      caption,
      images[0].uri.substring(0, 30),
      images.length,
    );
    var bodyFormData = new FormData();
    let arr = [];
    if (images) {
      images.forEach((item, i) => {
        bodyFormData.append('post_file', {
          uri: item.path,
          type: item.type,
          name: item.filename || `filename.jpg`,
        });
      });
    }

    // bodyFormData.append('post_file', {
    //   uri: images[0].path,
    //   type: images[0].type,
    //   name: `filename.jpg`,
    // });

    bodyFormData.append('user_id', id);
    bodyFormData.append('post_desc', caption);
    bodyFormData.append('post_title', 'Test Title');

    // bodyFormData.append('post_title', 'tags');
    // const URL = `${api}/api/post/createPost`;
    // const header = {
    //   headers: {
    //     'Content-Type':
    //       'multipart/form-data; boundary=<calculated when request is sent>',
    //   },
    // };
    try {
      // const response = await axios.post(URL, {bodyFormData}, header);

      const response = await axios({
        method: 'post',
        url: `${api}/api/post/createpost`,
        // data: {
        //   post_id: 46,
        //   post_desc: 'Test Descript',
        //   post_file: [{
        //     uri: images[0].uri,
        //     type: 'image/jpeg',
        //     name: `filename.jpg`,
        //   }],
        //   post_title: 'test',
        // },
        data: bodyFormData,
        headers: {
          // 'Content-Type':
          // 'multipart/form-data; boundary=<calculated when request is sent>',
          // 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      });
      console.log('===', response.data);
      if (response.data.success) {
        clearAllStates();
        navigation.navigate('HOME');
        showMessage({
          message: 'Posted!',
          description: '',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Failed to Post!',
          description: '',
          type: 'success',
        });
        _onPostFailed();
      }
    } catch (err) {
      _onPostFailed();
      console.log('Cannot Post Now, Something went wrong.');
      console.log(err.message);
      // console.log(err.response.data);
    }
  };

// export const userGet = userID => async dispatch => {
//   try {
//     // console.error(userID, "USER GET")
//     const response = await axios.get(`${api}/api/auth/userInfo`, {
//       params: {
//         user_id: userID,
//       },
//     });

//     // console.log(response.data.data)"user_latitude": "24.7931192", "user_lives": "Karachi", "user_longitude": "67.0665601"
//     if (response.data.status) {
//       // console.log(" USER DATA ======ACTION======")
//       // alert("SADSAD")
//       const userData = JSON.stringify(response.data.data);
//       await AsyncStorage.setItem('user', userData);
//       dispatch({
//         type: types.USER_GET_INFO,
//         payload: response.data.data,
//       });
//     } else {
//       showMessage({
//         message: 'Error',
//         description: 'AUTH Error',
//         danger: 'error',
//       });
//       // alert("error")
//     }
//   } catch (error) {
//     showMessage({
//       message: 'Error',
//       description: 'AUTH Error',
//       danger: 'error',
//     });
//     console.log(error);
//   }
// };

export const nearMeUsers = (latitude, longitude, userId) => async dispatch => {
  // console.log('FETCHING NEAR ME USERS !!!!!!!!!!!!!!!!!!!!!!');
  console.log(latitude, longitude, userId);
  try {
    const URL = `${api}/api/post/nearMe?kilometers=10&user_latitude=24.7931192&user_longitude=67.000000&user_id=${userId}`;
    console.log(URL);
    const response = await axios.get(URL);

    console.log('Total Near Me Users: ', response.data.data.length);
    if (response.data.data.length > 0) {
      console.log('Near Me Users Fetched!');
      dispatch({
        type: types.NEAR_ME_USERS,
        payload: response.data.data,
      });
    } else {
      // showMessage({
      //   message: 'Oh Snaps!',
      //   description: 'No Users Near You!',
      //   danger: 'error',
      // });
      console.log('No Near Me Users Found!');
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
    console.log(err.message, 'Failed Fetching Near Me Users.');
  }
};

export const loginUser = (email, password) => async dispatch => {
  console.log(email, password);
  try {
    const response = await axios.post(`${api}/api/auth/login`, {
      email: email,
      password: password,
    });
    if (response.data.success) {
      console.log('testtttt logged inn');
      dispatch({
        type: types.USER_GET_INFO,
        payload: {
          token: response.data.token,
          data: response.data.data,
          isLogin: true,
        },
      });
    } else {
      showMessage({
        message: 'Error',
        description: 'Invalid Credentials!',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Error',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('Login Failed', error);
    console.log('Login Failed', error.message);
  }
};

export const forgotPassword = (data, onSuccess) => async dispatch => {
  try {
    const URL = `${api}/api/auth/forgotpasword`;
    console.log(URL, data);
    const response = await axios.post(URL, data);

    if (response.data.status) {
      showMessage({
        message: 'Success!',
        description: 'A reset password link has been sent this email.',
        type: 'success',
      });
      onSuccess();
    } else {
      showMessage({
        message: 'Oh Snaps!',
        description: 'Something went wrong.',
        danger: 'error',
      });
    }
  } catch (err) {
    console.log(err);
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
  (
    username,
    email,
    phoneNumber,
    password,
    obj,
    gender,
    otp,
    navigation,
    lat,
    long,
  ) =>
  async dispatch => {
    console.log(
      'From Actions :::: ',
      username,
      email,
      phoneNumber,
      password,
      obj,
      gender,
      otp,
      "lat:",lat,
      "long:",long
    );
    try {
      const data = {
        user_name: username,
        user_email: email,
        user_password: password,
        user_contact: phoneNumber,
        user_reg_verify_code: otp,
        user_gender: gender,
        user_gender_interest: obj,
        user_latitude: lat,
        user_longitude: long,
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
    dispatch({
      type: types.USER_GET_INFO,
      payload: {
        token: null,
        data: null,
        isLogin: false,
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

export const getFeedData = userId => async dispatch => {
  try {
    const response = await axios.get(`${api}/api/post/getfeed?id=${userId}`);
    // console.log(response.data);
    if (response?.data?.success) {
      dispatch({
        type: types.GET_ALL_FEED_DATA,
        payload: response.data.data,
      });
    }
  } catch (err) {
    console.log('Failed Fetching Feed Data!!! ', err);
  }
};

export const coords = (lat, long) => async dispatch => {
  // console.log(lat, long, 'coords  ++++++++++++++++++++++');
  dispatch({
    type: types.USER_COORDS,
    payload: {
      lat: lat,
      long: long,
    },
  });
};

export const SignupAll =
  (userSignup, userFavourite, userInterest, _onSignUpFailed) =>
  async dispatch => {
    try {
      const apiData = {
        user_name: userSignup?.user_name,
        user_email: userSignup?.user_email,
        user_password: userSignup?.user_password,
        user_contact: userSignup?.user_contact,
        user_latitude: userSignup.user_latitude?.toString(),
        user_longitude: userSignup.user_longitude?.toString(),
        // user_reg_verify_code: userSignup.user_reg_verify_code,
        user_gender: [userSignup?.user_gender],
        user_gender_interest: userSignup?.user_gender_interest?.filter(
          e => e !== '',
        ),
        user_interest: userInterest,
        user_favorite: userFavourite,
        social_login: 'USER_AUTH',
      };
      console.log(JSON.stringify(apiData, null, 2));
      const URL = `${api}/api/auth/register`;
      console.log(URL);
      const response = await axios.post(URL, apiData);
      if (response.data.success) {
        dispatch({
          type: types.USER_GET_INFO,
          payload: {
            isLogin: true,
            data: response.data.data,
          },
        });
      } else {
        _onSignUpFailed();
        showMessage({
          message: 'Signup Failed',
          description: response.data.msg,
          danger: 'error',
        });
      }
      // dispatch({
      //   type: types.USER_FAVOURITE,
      //   payload: favourite,
      // });
    } catch (error) {
      _onSignUpFailed();
      showMessage({
        message: 'Signup Failed',
        description: 'Something went wrong.',
        danger: 'error',
      });
      console.log(error);
      console.log(error.message);
      console.log(error.response.data);
    }
  };

export const likePost = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/post/like`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.LIKE_UNLIKE_POST,
        payload: {
          totalLikes: response.data.data.likes,
          post_id: data?.post_id,
        },
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not like post, try again.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('FAILED LIKING POST', error);
  }
};

export const commentOnPost = (data, onSuccess) => async dispatch => {
  console.log(data);
  try {
    const response = await axios.post(`${api}/api/post/createcomment`, data);
    if (response.data.status) {
      onSuccess();
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not comment on post, try again.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('FAILED COMMENTING POST', error);
  }
};

export const getAllCommentsOfPost = postId => async dispatch => {
  console.log('Getting all comments of this post, POst_id: ', postId);
  try {
    const response = await axios.get(
      `${api}/api/post/comments?post_id=${postId}`,
    );
    if (response.data.status) {
      console.log(response.data.status, 'Comments Retrieved!!!');
      console.log('Total Comments: ', response.data.data.length);
      dispatch({
        type: types.GET_POST_COMMENTS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch comment of post, swipe down to refresh.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch comment of post, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED COMMENTING POST', error);
  }
};

// send request to drink buddy
export const connectUser =
  (data, onSuccess, profileData, _onRequestFialed) => async dispatch => {
    try {
      const response = await axios.post(
        `${api}/api/friends/friendRequest`,
        data,
      );
      console.log(response.data, 'Response of sending request');
      if (response?.data?.success === true) {
        showMessage({
          message: 'Offer requested, Wait for his/her approval.',
          type: 'success',
        });
        onSuccess();
        dispatch({
          type: types.AFTER_SENDING_REQ_FROM_PROFILE,
          payload: profileData,
        });
      } else {
        showMessage({
          message: 'Ohhh Snap!',
          description: 'Cann not offer drink at the moment, try again.',
          danger: 'error',
        });
        console.log('fail');
        _onRequestFialed();
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not offer drink at the moment, try again.',
        danger: 'error',
      });
      _onRequestFialed();
      console.log('FAILED CONNECTING USER', error?.response?.message);
    }
  };

export const getAllConnections = userId => async dispatch => {
  try {
    const response = await axios.get(`${api}/api/friends/friendList/${userId}`);
    if (response.data.success) {
      console.log('Connnections Retrieved!!!');
      console.log('Total Connections: ', response.data.data.length);
      dispatch({
        type: types.GET_ALL_CONNECTIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch connections, swipe down to refresh.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch connections, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Connections', error);
  }
};

// export const testFunc = userId => async dispatch => {
//   // try {
//   //   const res = await axios.get(`${api}/api/friends/friendList/${userId}`);
//   //   console.log(res.data.data.length, "Length");
//   //   dispatch({
//   //     type: types.TEST,
//   //     pyaload: [],
//   //   });
//   //   console.log("ttetetetettetetete==================================")
//   // } catch (err) {
//   //   console.log(err);
//   // }

//   try {
//     const response = await axios.get(
//       `${api}/api/friends/friendList/${userId}`,
//     );
//     if (response.data.success) {
//       console.log(response.data.status, 'Connections Retrieved!!!');
//       console.log('Total Connections: ', response.data.data);
//       dispatch({
//         type: types.GET_ALL_CONNECTIONS,
//         payload: response.data.data,
//       });
//     } else {
//       showMessage({
//         message: 'Oh Snap!',
//         description: 'Can not fetch Connections, swipe down to refresh.',
//         danger: 'error',
//       });
//     }
//   } catch (error) {
//     showMessage({
//       message: 'Oh Snap!',
//       description: 'Can not fetch Connections, swipe down to refresh.',
//       danger: 'error',
//     });
//     console.log('FAILED Fetching Connections', error.response.data.msg);
//   }

// };
export const getInvites = userId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/friends/pendingList/${userId}`,
    );
    console.log(response.data);
    if (response.data.success) {
      console.log(response.data.status, 'Invitations Retrieved!!!');
      console.log('Total Invitations: ', response.data.data);
      dispatch({
        type: types.GET_INVITATIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Ohhh Snap!',
        description: 'Can not fetch Invitations, swipe down to refresh.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch Invitations, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Invitations', error);
  }
};

export const acceptInvite = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/acceptFriend`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.ACCEPT_FRIEND,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not accept connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not accept connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED ACCEPTING ', error);
  }
};

export const ignoreInvite = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/rejectFriend`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.REJECT_FRIEND,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not reject connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not reject connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED REJECTING ', error);
  }
};

export const unfriendUserFromProfile = data => async dispatch => {
  console.log(data, ' api data of unfriend');
  try {
    const response = await axios.post(`${api}/api/friends/unFriend`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.CANCEL_OFFER_FROM_PROFILE,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not unfriend connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not unfriend connection at the moment, try again.',
      danger: 'error',
    });
    console.log('Unable to remove friend from profile');
  }
};
export const unfriendUser = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/unFriend`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.UNFRIEND,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not unfriend connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not unfriend connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED UNFRIEND', error);
  }
};

export const cancelOfferFromProfile = data => async dispatch => {
  console.log(data);
  try {
    const response = await axios.post(`${api}/api/friends/cancelRequest`, data);
    if (response.data.status) {
      showMessage({
        message: 'Offer requested now has been cancelled.',
        // description: 'Offer requested, Wait for his/her approval.',
        type: 'success',
      });
      dispatch({
        type: types.CANCEL_OFFER_FROM_PROFILE,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not cancel request at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not cancel request at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED CANCELLING MY REQUEST', error);
  }
};

export const cancelMyRequestSent = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/cancelRequest`, data);
    if (response.data.status) {
      console.log(response.data);
      dispatch({
        type: types.CANCEL_REQUEST_SENT,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not cancel request at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not cancel request at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED CANCELLING MY REQUEST', error);
  }
};

export const buyMoreDrinks = (data, _closeStripeModal) => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/checout/create`, data);
    console.log(response.data);
    if (response.data.success) {
      console.log(response.data, 'Bought Drinks!!!!!!!');
      dispatch({
        type: types.BUY_DRINKS,
        payload: data.coins,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not buy drinks at the moment, try again.',
        danger: 'error',
      });
    }
    _closeStripeModal();
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not buy drinks at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED BUYING DRINKS', error);
    _closeStripeModal();
  }
};

export const saveNearmeUserData = data => async dispatch => {
  try {
    dispatch({
      type: types.SAVE_NEAR_ME_USER_DATA,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNotifications = userId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/post/getNotification?user_id=${userId}`,
    );
    if (response.data.status) {
      console.log(response.data.status, 'Notifications Retrieved!!!');
      console.log('Total Notifications: ', response.data.data.length);
      dispatch({
        type: types.GET_NOTIFICATIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch notifications, swipe down to refresh.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch notifications, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching notifications', error.response.data.msg);
  }
};

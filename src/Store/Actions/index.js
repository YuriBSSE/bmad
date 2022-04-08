import axios from 'axios';
import {api, deploy_API} from '../../Config/Apis.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from './actionType';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const postAction =
  (caption, images, id, navigation, clearAllStates) => async dispatch => {
    console.log('API DATA: ', id, caption, images[0].uri.substring(0, 30));
    var bodyFormData = new FormData();
    let arr = [];
    // if (images) {
    //   images.forEach((item, i) => {
    //     arr.push({
    //       uri: images[0].uri,
    //       type: 'image/jpeg',
    //       name: item.filename || `filename.jpg`,
    //     });
    //   });
    // }
   
    bodyFormData.append('post_file', {
      uri: images[0].uri,
      type: 'image/jpeg',
      name: `filename.jpg`,
    });
    bodyFormData.append('user_id', id);
    bodyFormData.append('post_desc', caption);

    // bodyFormData.append('post_title', 'tags');
    const URL = `${api}/api/post/createPost`;
    const header = {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
      },
    };
    try {
      const response = await axios.post(URL, bodyFormData, header);
      console.log("===",response);
      // if (response.data.success) {
      //   clearAllStates();
      //   navigation.navigate('HOME');
      //   showMessage({
      //     message: 'Posted!',
      //     description: '',
      //     type: 'success',
      //   });
      // } else {
      //   showMessage({
      //     message: 'Failed to Post!',
      //     description: '',
      //     type: 'success',
      //   });
      // }
    } catch (err) {
      console.log('Cannot Post Now, Something went wrong.');
      console.log(err.message);
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
  try {
    const URL = `${api}/api/post/nearMe?kilometers=10&user_latitude=${latitude}&user_longitude=${longitude}&user_id=${userId}`;
    const response = await axios.get(URL);

    // console.log('Total Near Me Users: ', response.data.data.length);
    if (response.data.data.length > 0) {
      // console.log('Near Me Users Fetched!');
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
      // console.log('No Near Me Users Found!');
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
    if (response.data.status) {
      console.log('testtttt logged inn');
      dispatch({
        type: types.USER_GET_INFO,
        payload: {
          token: response.data.token,
          data: response.data.data,
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
    dispatch({
      type: types.USER_GET_INFO,
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

export const getFeedData = userId => async dispatch => {
  try {
    const response = await axios.get(`${api}/api/post/getfeed?id=${userId}`);
    if (response?.data?.status) {
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
export const connectUser = (data, onSuccess, profileData) => async dispatch => {
  console.log(data, ',,,,,,,,,,,,,,,,,,,,,,,');
  try {
    const response = await axios.post(`${api}/api/friends/friendRequest`, data);
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
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not offer drink at the moment, try again.',
      danger: 'error',
    });
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

export const testFunc = userId => async dispatch => {
  try {
    const res = await axios.get(`${api}/api/friends/friendList/${userId}`);
    console.log(res.data.data);
    dispatch({
      type: 'GET_ALL_CONNECTIONS',
      pyaload: [],
    });
  } catch (err) {
    console.log(err);
  }
};
export const getInvites = userId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/friends/pendingList/${userId}`,
    );
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
    if (response.data.status) {
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
      console.log('Total Notifications: ', response.data.data);
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

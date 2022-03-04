import {VERIFY_OTP} from '../actions/type';
import {
  AUTH_LOGGED_IN,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  AUTH_OTP,
  USER_INTEREST,
  USER_FAVOURITE,
  AUTH_ALL_SIGNUP,
  USER_GET_INFO,
} from '../Actions/actionType';
const initialState = {};
const initialStateOfUser = {
  token: null,
  data: null,
};

export function userLogin(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGGED_IN:
      return action.payload;
    case AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}

// For Signup Data Get to 3 steps
export function userSignup(state = initialState, action) {
  switch (action.type) {
    case AUTH_SIGNUP:
      return action.payload;
    default:
      return state;
  }
}

export function userOtp(state = initialState, action) {
  switch (action.type) {
    case AUTH_OTP:
      return action.payload;
    default:
      return state;
  }
}

export function userOtpVerify(state = initialState, action) {
  switch (action.type) {
    case AUTH_OTP_VERIFY:
      return action.payload;
    default:
      return state;
  }
}

export function userInterest(state = initialState, action) {
  switch (action.type) {
    case USER_INTEREST:
      return action.payload;
    default:
      return state;
  }
}

export function userFavourite(state = initialState, action) {
  switch (action.type) {
    case USER_FAVOURITE:
      return action.payload;
    default:
      return state;
  }
}

export function userAuthSignUp(state = initialStateOfUser, action) {
  switch (action.type) {
    case AUTH_ALL_SIGNUP:
      return action.payload;
    case AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}

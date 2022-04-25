import {
  USER_GET_INFO,
  NEAR_ME_USERS,
  NO_NEAR_ME_USERS,
  USER_COORDS,
  LIKE_UNLIKE_POST,
  GET_ALL_FEED_DATA,
  COMMENT_ON_POST,
  USER_PROFILE,
  GET_INVITATIONS,
  GET_POST_COMMENTS,
  CANCEL_REQUEST_SENT,
  GET_ALL_CONNECTIONS,
  TEST,
  CANCEL_OFFER_FROM_PROFILE,
  SAVE_NEAR_ME_USER_DATA,
  UNFRIEND,
  AFTER_SENDING_REQ_FROM_PROFILE,
  GET_NOTIFICATIONS,
  BUY_DRINKS,
} from './../Actions/actionType';

const iNITIAL_NEAR_ME = {
  allUsers: [],
  user: null,
};
const coordsState = {
  lat: null,
  long: null,
};

const INITIAL_USER_DATA = {
  data: null,
  isLogin: false,
  accessToken: '',
  
};

const INITIAL_STATE_POSTS = {
  feedPosts: [],
  postComments: [],
};

const INITIAL_NOTI_DATA = {
  notifications: [],
};

const INITIAL_CONNECTIONS_DATA = {
  connections: [],
  invitations: [],
}

export function userReducer(state = INITIAL_USER_DATA, action) {
  switch (action.type) {
    case USER_GET_INFO:
      return {
        ...state,
        data: action.payload.data,
        accessToken: action.payload.token,
        isLogin: action.payload.isLogin,
      };

      case BUY_DRINKS:
      console.log(state?.data,"------")
      return {
        ...state,
        data: {
          ...state.data,
          coins: Number(state?.data?.coins) + Number(action?.payload),
        },
      };
    default:
      return state;
  }
}

export function usersNearmeReducer(state = iNITIAL_NEAR_ME, action) {
  switch (action.type) {
    case NEAR_ME_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case NO_NEAR_ME_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case SAVE_NEAR_ME_USER_DATA:
      console.log(action.payload, '+++++++++++++++++++++++++++++++');
      return {
        ...state,
        user: action.payload,
      };

    case CANCEL_OFFER_FROM_PROFILE:
      console.log(action.payload, 'xxxxxxxxxxxxxxx');
      return {
        ...state,
        user: {
          ...state.user,
          connected: 'null',
        },
      };

    case AFTER_SENDING_REQ_FROM_PROFILE:
      console.log('near me user ak dataaaaaaa');
      console.log(state.user);
      return {
        ...state,
        user: {
          user: action.payload,
          connected: 'send',
        },
      };

    default:
      return state;
  }
}

export function userCoordsReducer(state = coordsState, action) {
  switch (action.type) {
    case USER_COORDS:
      return action.payload;
    default:
      return state;
  }
}

export function postsReducer(state = INITIAL_STATE_POSTS, action) {
  switch (action.type) {
    case GET_ALL_FEED_DATA:
      return {
        ...state,
        feedPosts: action.payload,
      };

    case COMMENT_ON_POST:
      return {
        ...state,
      };

    case GET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
      };

    case LIKE_UNLIKE_POST:
      let post_id = action.payload.post_id;
      let index = 0;

      state.feedPosts.map((ele, idx) => {
        if (ele.post_id === post_id) {
          index = idx;
        }
      });

      let copyFeedPosts = [...state.feedPosts];
      copyFeedPosts[index].is_like = copyFeedPosts[index].is_like == 0 ? 1 : 0;
      copyFeedPosts[index].count_likes = action.payload.totalLikes;
      return {
        ...state,
        feedPosts: [...copyFeedPosts],
      };
    default:
      return state;
  }
}

export function notificationsReducer(state = INITIAL_NOTI_DATA, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
}

export function connectionsReducer(state = INITIAL_CONNECTIONS_DATA, action) {
  switch (action.type) {
    case GET_ALL_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
      };

    

    case UNFRIEND:
      let index = 0;
      let copyArr = [...state.connections];
      copyArr.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          index = idx;
        }
      });
      copyArr.splice(index, 1);
      return {
        ...state,
        connections: copyArr,
      };

    case CANCEL_REQUEST_SENT:
      let indx = 0;
      let copyAr = [...state.invitations];
      copyAr.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          index = idx;
        }
      });
      copyAr.splice(index, 1);
      return {
        ...state,
        invitations: copyAr,
      };

    case GET_INVITATIONS:
      return {
        ...state,
        invitations: action.payload,
      };
    default:
      return state;
  }
}

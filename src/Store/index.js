import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  userLogin,
  userSignup,
  userFavourite,
  userInterest,
  userAuthSignUp,
} from './Reducers/AuthReducers';
import {
  userReducer,
  postsReducer,
  usersNearmeReducer,
  userCoordsReducer,
  notificationsReducer,connectionsReducer
} from './Reducers/InAppReducer';

const reducers = combineReducers({
  userLogin,
  userSignup,
  userFavourite,
  userInterest,
  userAuthSignUp,
  userReducer,
  usersNearmeReducer,
  userCoordsReducer,
  postsReducer,
  notificationsReducer,connectionsReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer', 'userCoordsReducer'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk)),
);
let persistor = persistStore(store);

export {store, persistor};

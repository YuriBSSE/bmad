import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {userLogin, userSignup,userFavourite,userInterest,userAuthSignUp} from './Reducers/AuthReducers'
import {userGets, getNearMeUsers, getUserCoords} from './Reducers/InAppReducer'

const reducers=combineReducers({
    userLogin,
    userSignup,
    userFavourite,
    userInterest,
    userAuthSignUp,
    userGets,
    getNearMeUsers,
    getUserCoords
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store
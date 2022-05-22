import {applyMiddleware, combineReducers, createStore} from "redux";
import postPageReducer from "./postPageReducer";
import messagesPageReducer from "./messagesPageReducer";
import usersPageReducer from "./UsersPageReducer";
import profilePageReducer from "./ProfilePageReducer";
import authReducer from "./auth";
import thunkMiddleWare from "redux-thunk"
import appReducer from "./appReducer";

let reducers = combineReducers({
    postPage: postPageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    profilePage: profilePageReducer,
    auth: authReducer,
    app: appReducer
}, ['Use Redux'])

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;
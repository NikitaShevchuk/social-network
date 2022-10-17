import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk"
import postPageReducer from "./reducers/postPageReducer";
import messagesReducer from "./reducers/messagesReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import appReducer from "./reducers/appReducer";

const reducersToCombine = {
    postPage: postPageReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer
}

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

let reducers = combineReducers(reducersToCombine)

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export type RootState = ReturnType<typeof store.getState>
export default store;
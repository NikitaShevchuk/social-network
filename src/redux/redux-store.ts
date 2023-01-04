import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import postPageReducer from './reducers/postPageReducer';
import messagesReducer from './reducers/messages-reducer';
import usersReducer from './reducers/users-reducer';
import profileReducer from './reducers/profile-reducer';
import authReducer from './reducers/auth-reducer';
import appReducer from './reducers/app-reducer';
import dialogsReducer from './reducers/dialogs-reducer';

const reducersToCombine = {
    postPage: postPageReducer,
    messagesPage: messagesReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer
};

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
    PropertiesTypes<T>
>;

const reducers = combineReducers(reducersToCombine);

// Connecting redux-devtools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export type RootState = ReturnType<typeof store.getState>;
export default store;

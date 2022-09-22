import {AuthInitialState} from "../../../types/authTypes";
import {AuthActionsTypes} from "./actions";

const initialState: AuthInitialState = {
    userData: {
        id: 0,
        login: null,
        email: null
    },
    profileImg: null,
    clientStatus: '',
    isAuthorized: false,
    successLogin: false,
    loginFailed: '',
    captcha: {
        url: null
    }
}

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitialState => {
    switch (action.type) {
        case "authReducer/SET_USER_DATA":
            return {
                ...state,
                userData: action.userData
            }
        case 'authReducer/SET_USER_PHOTO':
            return {
                ...state,
                profileImg: action.userPhoto
            }
        case 'authReducer/TOGGLE_IS_AUTHORIZED':
            return {
                ...state,
                isAuthorized: action.toggle
            }
        case 'authReducer/LOGIN':
            return {
                ...state,
                successLogin: action.isLoggedIn
            }
        case 'authReducer/LOGIN_FAILED':
            return {
                ...state,
                loginFailed: action.loginErrorText
            }
        case 'authReducer/LOGOUT':
            return {
                ...state,
                isAuthorized: false,
                successLogin: false,
                userData: {id: 0, login: null, email: null},
                profileImg: null
            }
        case 'authReducer/GET_CAPTCHA':
            return {
                ...state,
                captcha: action.captcha
            }
        case 'authReducer/SET_CLIENT_STATUS':
            return {
                ...state,
                clientStatus: action.clientStatus
            }
        default:
            return state;
    }
}

export default authReducer;
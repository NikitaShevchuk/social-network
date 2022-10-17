import {AuthActionsTypes} from "./actions";
import {UserData} from "../../../types/AuthTypes";
import {Profile} from "../../../types/ProfileTypes";

interface AuthInitialState {
    userData: UserData
    profileImg: string | null
    clientStatus: string | null
    isAuthorized: boolean
    successLogin: boolean
    loginFailed: string | null
    captcha: {
        url: string | null
    }
    clientProfile: Profile
}

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
    },
    clientProfile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null
        },
        fullName: '',
        lookingForAJob: false,
        photos: { large: null, small: null },
        userId: 0,
        lookingForAJobDescription: ''
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
        case "authReducer/SET_CLIENT_PROFILE":
            return {
                ...state,
                clientProfile: action.clientProfile
            }
        default:
            return state;
    }
}

export default authReducer;
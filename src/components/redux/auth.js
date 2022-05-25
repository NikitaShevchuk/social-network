import {profileApi, securityApi} from "./api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const TOGGLE_IS_AUTHORIZED = 'TOGGLE_IS_AUTHORIZED';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGIN_FAILED = 'LOGIN_FAILED';
const GET_CAPTCHA = 'GET_CAPTCHA';

let initialState = {
    userData: {
        id: null,
        login: null,
        email: null
    },
    profileImg: null,
    isAuthorized: false,
    successLogin: false,
    loginFailed: '',
    captcha: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto
            }
        case TOGGLE_IS_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.toggle
            }
        case LOGIN:
            return {
                ...state,
                successLogin: action.login
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginFailed: action.loginErrorText
            }
        case LOGOUT:
            return {
                ...state,
                isAuthorized: false,
                successLogin: false,
                userData: {id: null, login: null, email: null},
                profileImg: null
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state;
    }
}

const setUserData = (userData) => ({type: SET_USER_DATA, userData})
const setUserPhoto = (userPhoto) => ({type: SET_USER_PHOTO, userPhoto})
const toggleIsAuthorized = (toggle) => ({type: TOGGLE_IS_AUTHORIZED, toggle})
const login = (login) => ({type: LOGIN, login})
const logout = () => ({type: LOGOUT})
const loginError = (loginErrorText) => ({type: LOGIN_FAILED, loginErrorText})
const getCaptcha = captcha => ({type: GET_CAPTCHA, captcha})

export const authorize = () => (dispatch) => {
    return profileApi.auth().then(data => {
        if (data.resultCode === 0) {
            dispatch(toggleIsAuthorized(true))
            dispatch(setUserData(data.data));
            profileApi.getProfile(data.data.id).then(data => {
                dispatch(setUserPhoto(data.photos.small));
            })
        }
    })
}

export const loginThunk = (formData) => async (dispatch) => {
    let data = await profileApi.login(formData)
    if (data.resultCode === 0) {
        dispatch(login(true))
        dispatch(authorize());
    } else if (data.resultCode === 1) {
        dispatch(loginError(data.messages[0]))
    } else if (data.resultCode === 10) {
        let captcha = await securityApi.requireCaptcha();
        dispatch(getCaptcha(captcha))
        debugger
    }
}

export const logoutThunk = () => async (dispatch) => {
    let data = await profileApi.logout()
    if (data.resultCode === 0) {
        dispatch(logout())
    }
}


export default authReducer;
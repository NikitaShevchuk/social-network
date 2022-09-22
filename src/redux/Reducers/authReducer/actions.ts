import {UserData} from "../../../types/authTypes";
import {InferActionsTypes} from "../../redux-store";
import {Captcha} from "../../../components/Login/Login";

export const authActions = {
    setUserData: (userData: UserData) => ({type: 'authReducer/SET_USER_DATA', userData} as const),
    setUserPhoto: (userPhoto: string | null) => ({type: 'authReducer/SET_USER_PHOTO', userPhoto} as const),
    toggleIsAuthorized: (toggle: boolean) => ({type: 'authReducer/TOGGLE_IS_AUTHORIZED', toggle} as const),
    login: (isLoggedIn: boolean) => ({type: 'authReducer/LOGIN', isLoggedIn} as const),
    logout: () => ({type: 'authReducer/LOGOUT'} as const),
    loginError: (loginErrorText: string) => ({type: 'authReducer/LOGIN_FAILED', loginErrorText} as const),
    getCaptcha: (captcha: Captcha) => ({type: 'authReducer/GET_CAPTCHA', captcha} as const),
    setMyStatus: (clientStatus: string) => ({type: 'authReducer/SET_CLIENT_STATUS', clientStatus} as const)
}

export type AuthActionsTypes = InferActionsTypes<typeof authActions>


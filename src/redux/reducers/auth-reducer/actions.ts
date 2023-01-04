import { UserData } from '../../../types/AuthTypes';
import { InferActionsTypes } from '../../redux-store';
import { Captcha } from '../../../components/Login/Login';
import { Profile } from '../../../types/ProfileTypes';

export const authActions = {
    setUserData: (userData: UserData) =>
        ({ type: 'auth-reducer/SET_USER_DATA', userData } as const),
    setUserPhoto: (userPhoto: string | null) =>
        ({ type: 'auth-reducer/SET_USER_PHOTO', userPhoto } as const),
    toggleIsAuthorized: (toggle: boolean) =>
        ({ type: 'auth-reducer/TOGGLE_IS_AUTHORIZED', toggle } as const),
    login: (isLoggedIn: boolean) => ({ type: 'auth-reducer/LOGIN', isLoggedIn } as const),
    logout: () => ({ type: 'auth-reducer/LOGOUT' } as const),
    loginError: (loginErrorText: string) =>
        ({ type: 'auth-reducer/LOGIN_FAILED', loginErrorText } as const),
    getCaptcha: (captcha: Captcha) => ({ type: 'auth-reducer/GET_CAPTCHA', captcha } as const),
    setMyStatus: (clientStatus: string) =>
        ({ type: 'auth-reducer/SET_CLIENT_STATUS', clientStatus } as const),
    setClientProfile: (clientProfile: Profile) =>
        ({ type: 'auth-reducer/SET_CLIENT_PROFILE', clientProfile } as const)
};

export type AuthActionsTypes = InferActionsTypes<typeof authActions>;

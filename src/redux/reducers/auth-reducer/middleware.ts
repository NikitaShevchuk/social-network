import { FormValues } from '../../../components/Login/LoginContainer';
import { ResultCodes } from '../../../services';
import { authActions } from './actions';
import { appActions } from '../app-reducer/actions';
import { AsyncThunk } from '../../Models';
import { profileService } from '../../../services/profileService';
import { securityService } from '../../../services/securityService';
import { tryToReconnect } from '../app-reducer/middleware';

const setMyProfileById =
    (id: number): AsyncThunk =>
    async (dispatch) => {
        const profileResponse = await profileService.getProfile(id);
        dispatch(authActions.setClientProfile(profileResponse));
        dispatch(authActions.setUserPhoto(profileResponse.photos.small));
        return profileResponse;
    };

const setMyStatusById =
    (id: number): AsyncThunk =>
    async (dispatch) => {
        const statusResponse = await profileService.getStatus(id);
        dispatch(authActions.setMyStatus(statusResponse));
        return statusResponse;
    };

export const authorize = (): AsyncThunk => async (dispatch) => {
    try {
        const authResponse = await profileService.auth();
        const { id } = authResponse.data;
        if (authResponse.resultCode === ResultCodes.Success) {
            dispatch(authActions.setUserData(authResponse.data));
            await dispatch(setMyProfileById(id));
            await dispatch(setMyStatusById(id));
            dispatch(authActions.toggleIsAuthorized(true));
        }
    } catch {
        dispatch(tryToReconnect());
    }
};

export const loginThunk =
    (formData: FormValues): AsyncThunk =>
    async (dispatch) => {
        try {
            const data = await profileService.login(formData);
            if (data.resultCode === ResultCodes.Success) {
                dispatch(authActions.login(true));
                await Promise.all([dispatch(authorize())]);
            } else if (data.resultCode === ResultCodes.Error) {
                dispatch(authActions.loginError(data.messages[0]));
            } else if (data.resultCode === ResultCodes.CaptchaError) {
                dispatch(authActions.loginError(data.messages[0]));
                const captcha = await securityService.requireCaptcha();
                dispatch(authActions.getCaptcha(captcha));
            }
        } catch {
            dispatch(appActions.addError('Login failed'));
        }
    };

export const logoutThunk = (): AsyncThunk => async (dispatch) => {
    try {
        const data = await profileService.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(authActions.logout());
        }
    } catch {
        dispatch(appActions.addError('Network error. Logout failed'));
    }
};

export const updStatusThunk =
    (newStatus: string): AsyncThunk =>
    async (dispatch) => {
        try {
            const updStatusResponse = await profileService.updStatus(newStatus);
            if (updStatusResponse.resultCode === ResultCodes.Success) {
                dispatch(authActions.setMyStatus(newStatus));
            } else if (updStatusResponse.messages[0]) {
                dispatch(appActions.addError(updStatusResponse.messages[0]));
            } else {
                dispatch(appActions.addError('An error occurred'));
            }
        } catch {
            dispatch(appActions.addError('Status update failed. Network error'));
        }
    };

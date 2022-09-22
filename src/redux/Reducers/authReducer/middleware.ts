import {profileApi, ResultCodes, securityApi} from "../../../api/api";
import {authActions} from "./actions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../redux-store";
import {AnyAction} from "redux";

export const authorize = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch) => {
        return profileApi.auth().then(authResponse => {
            if (authResponse.resultCode === ResultCodes.Success) {
                dispatch(authActions.toggleIsAuthorized(true))
                dispatch(authActions.setUserData(authResponse.data));
                profileApi.getProfile(authResponse.data.id).then(profileResponse => {
                    dispatch(authActions.setUserPhoto(profileResponse.photos.small));
                })
                profileApi.getStatus(authResponse.data.id).then( data => {
					debugger
                    dispatch(authActions.setMyStatus(data))
                } )
            }
    })
}

export const loginThunk = (formData: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        let data = await profileApi.login(formData)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(authActions.login(true));
            dispatch(authorize());
        } else if (data.resultCode === ResultCodes.Error) {
            if (data.messages) dispatch(authActions.loginError(data.messages[0]))
        } else if (data.resultCode === ResultCodes.CaptchaError) {
            if (data.messages)  dispatch(authActions.loginError(data.messages[0]))
            let captcha = await securityApi.requireCaptcha();
            dispatch(authActions.getCaptcha(captcha))
        }
}

export const logoutThunk = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        let data = await profileApi.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(authActions.logout())
        }
}

export const updateProfileImg = (profileImg: string | null): ThunkAction<void, RootState, any, AnyAction> =>
    (dispatch) => {
        dispatch(authActions.setUserPhoto(profileImg))
}
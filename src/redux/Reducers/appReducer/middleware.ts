import {ThunkAction} from "redux-thunk";
import {RootState} from "../../redux-store";
import {AnyAction} from "redux";
import {authorize} from "../authReducer/middleware";
import {appActions} from "./actions";

type ThunkType = ThunkAction<void, RootState, any, AnyAction>

export const initializeApp = (): ThunkType => async (dispatch) => {
    await Promise.all([dispatch(authorize())])
    dispatch(appActions.initializedSuccess(true))
}
export const tryToReconnect = (): ThunkType => async (dispatch) => {
    dispatch(appActions.addAppError('Connection failed. Trying to reconnect...'))
    await Promise.all([dispatch(authorize())])
    dispatch(appActions.addAppError(null))
    dispatch(appActions.initializedSuccess(true))
}
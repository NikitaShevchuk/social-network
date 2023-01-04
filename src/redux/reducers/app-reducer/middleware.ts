import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../redux-store';
import { authorize } from '../auth-reducer/middleware';
import { appActions } from './actions';
import { timeout } from '../../../common/helpers/sleep';

type ThunkType = ThunkAction<void, RootState, any, AnyAction>;

export const tryToReconnect = (): ThunkType => async (dispatch) => {
    dispatch(appActions.addAppError('Connection failed. Trying to reconnect...'));
    await timeout(2000);
    await Promise.all([dispatch(authorize())]);
    dispatch(appActions.addAppError(null));
    dispatch(appActions.initializedSuccessfully(true));
};

export const initializeApp = (): ThunkType => async (dispatch) => {
    try {
        await Promise.all([dispatch(authorize())]);
        dispatch(appActions.initializedSuccessfully(true));
    } catch {
        dispatch(appActions.addError(`Can't authorize`));
    }
};

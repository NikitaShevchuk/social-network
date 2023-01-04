import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../redux-store';

export type AsyncThunk = ThunkAction<void, RootState, unknown, AnyAction>;

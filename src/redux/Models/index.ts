import {ThunkAction} from "redux-thunk";
import {RootState} from "../redux-store";
import {AnyAction} from "redux";

export type AsyncThunk = ThunkAction<void, RootState, unknown, AnyAction>
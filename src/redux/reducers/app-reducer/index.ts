import { AppActionTypes } from './actions';
import { addNewError } from './helpers';

export interface AppInitialState {
    isInitialized: boolean;
    appError: string | null;
    errors: string[];
}
export const appInitialState: AppInitialState = {
    isInitialized: false,
    appError: null,
    errors: []
};

const appReducer = (state = appInitialState, action: AppActionTypes): AppInitialState => {
    switch (action.type) {
        case 'app-reducer/INITIALIZE_APP':
            return {
                ...state,
                isInitialized: action.isInitialized
            };
        case 'app-reducer/ADD_APP_ERROR':
            return {
                ...state,
                appError: action.errorText
            };
        case 'app-reducer/ADD_SINGLE_ERROR':
            return addNewError(state, action);
        case 'app-reducer/REMOVE_SINGLE_ERROR':
            return {
                ...state,
                errors: state.errors.filter((errText) => action.errorText !== errText)
            };
        case 'app-reducer/CLEAR_ALL_ERRORS':
            return {
                ...state,
                errors: []
            };
        default:
            return state;
    }
};

export default appReducer;

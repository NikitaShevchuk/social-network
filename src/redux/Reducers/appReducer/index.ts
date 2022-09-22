import {AppActionTypes} from "./actions";

export interface InitialState {
    initialized: boolean
    appError: string | null
}
const initialState: InitialState = {
    initialized: false,
    appError: null
}

const appReducer = (state = initialState, action: AppActionTypes): InitialState => {
    switch (action.type) {
        case 'appReducer/INITIALIZE_APP':
            return {
                ...state,
                initialized: action.initialized
            }
        case 'appReducer/ADD_APP_ERROR':
            return {
                ...state,
                appError: action.errorText
            }
        default:
            return state;
    }
}

export default appReducer;
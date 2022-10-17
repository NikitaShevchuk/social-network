import {AppActionTypes} from "./actions";

export interface InitialState {
    isInitialized: boolean
    appError: string | null
    errors: string[]
}
const initialState: InitialState = {
    isInitialized: false,
    appError: null,
    errors: []
}

const appReducer = (state = initialState, action: AppActionTypes): InitialState => {
    switch (action.type) {
        case 'appReducer/INITIALIZE_APP':
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        case 'appReducer/ADD_APP_ERROR':
            return {
                ...state,
                appError: action.errorText
            }
        case 'appReducer/ADD_SINGLE_ERROR':
            return {
                ...state,
                errors: [...state.errors, action.errorText]
            }
        case 'appReducer/REMOVE_SINGLE_ERROR':
            return {
                ...state,
                errors: state.errors.filter(errText => action.errorText !== errText)
            }
        case 'appReducer/CLEAR_ALL_ERRORS':
            return {
                ...state,
                errors: []
            }
        default:
            return state;
    }
}

export default appReducer;
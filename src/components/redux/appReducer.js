import {authorize} from "./auth";


const INITIALIZE_APP = 'INITIALIZE_APP';

let initialState = {
    initialized: false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {
                ...state,
                initialized: action.initialized
            }
        default:
            return state;
    }
}

const initializedSuccess = (initialized) => ({type: INITIALIZE_APP, initialized})

export const initializeApp = () => (dispatch) => {
    dispatch(authorize()).then(() => {
        dispatch(initializedSuccess(true))
    })
}

export default appReducer;
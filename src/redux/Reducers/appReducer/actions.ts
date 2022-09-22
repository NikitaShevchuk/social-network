import {InferActionsTypes} from "../../redux-store";

export const appActions = {
    initializedSuccess: (initialized: boolean) => ({type: 'appReducer/INITIALIZE_APP', initialized} as const),
    addAppError: (errorText: string | null) => ({type: 'appReducer/ADD_APP_ERROR', errorText} as const)
}

export type AppActionTypes = InferActionsTypes<typeof appActions>
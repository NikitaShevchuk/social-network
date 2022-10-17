import {InferActionsTypes} from "../../redux-store";

export const appActions = {
    initializedSuccessfully: (isInitialized: boolean) => (
        {type: 'appReducer/INITIALIZE_APP', isInitialized} as const
    ),
    addAppError: (errorText: string | null) => (
        {type: 'appReducer/ADD_APP_ERROR', errorText} as const
    ),
    addError: (errorText: string) => (
        {type: 'appReducer/ADD_SINGLE_ERROR', errorText} as const
    ),
    removeError: (errorText: string) => (
        {type: 'appReducer/REMOVE_SINGLE_ERROR', errorText} as const
    ),
    clearAllErrors: () => (
        {type: 'appReducer/CLEAR_ALL_ERRORS'} as const
    )
}
export const {
    initializedSuccessfully, clearAllErrors, removeError, addError, addAppError
} = appActions

export type AppActionTypes = InferActionsTypes<typeof appActions>
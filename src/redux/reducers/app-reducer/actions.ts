import { InferActionsTypes } from '../../redux-store';

export const appActions = {
    initializedSuccessfully: (isInitialized: boolean) =>
        ({ type: 'app-reducer/INITIALIZE_APP', isInitialized } as const),
    addAppError: (errorText: string | null) =>
        ({ type: 'app-reducer/ADD_APP_ERROR', errorText } as const),
    addError: (errorText: string) => ({ type: 'app-reducer/ADD_SINGLE_ERROR', errorText } as const),
    removeError: (errorText: string) =>
        ({ type: 'app-reducer/REMOVE_SINGLE_ERROR', errorText } as const),
    clearAllErrors: () => ({ type: 'app-reducer/CLEAR_ALL_ERRORS' } as const)
};
export const { initializedSuccessfully, clearAllErrors, removeError, addError, addAppError } =
    appActions;

export type AppActionTypes = InferActionsTypes<typeof appActions>;

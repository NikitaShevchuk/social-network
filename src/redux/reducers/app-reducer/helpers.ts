import { AppInitialState } from './index';

export const addNewError = (
    state: AppInitialState,
    action: { errorText: string }
): AppInitialState => {
    const errorAlreadyExist = state.errors.find(
        (errorInState) => errorInState === action.errorText
    );
    if (errorAlreadyExist) return state;
    return {
        ...state,
        errors: [...state.errors, action.errorText]
    };
};

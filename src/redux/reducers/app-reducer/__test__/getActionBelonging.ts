import { appActions, AppActionTypes } from '../actions';
import { authActions, AuthActionsTypes } from '../../auth-reducer/actions';

interface ActionBelonging {
    isAuthAction: boolean;
    isAppAction: boolean;
}
export const getActionBelonging = (action: AppActionTypes | AuthActionsTypes): ActionBelonging => {
    const findActionInObj = (actions: any): boolean => {
        const keys = Object.keys(actions);
        return keys.findIndex((key) => actions[key]({}).type === action.type) !== -1;
    };
    return {
        isAppAction: findActionInObj(appActions),
        isAuthAction: findActionInObj(authActions)
    };
};

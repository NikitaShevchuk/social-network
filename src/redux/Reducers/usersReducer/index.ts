import {changeById} from "../../Helpers/reducerHelpers";
import {UsersActionsTypes} from "./actions";
import {IinitialState} from "../../../types/usersTypes";

export const initialState: IinitialState = {
    users: [],
    pageSize: 20,
    isFetching: true,
    disableWhileRequest: [],
    totalCount: 1,
    currentPage: 1
}

const UsersPageReducer = (state = initialState, action: UsersActionsTypes) => {
    switch (action.type) {
        case "usersReducer/SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "usersReducer/UPD_USERS":
            return {
                ...state,
                users: [...state.users, ...action.newUsers]
            }
        case "usersReducer/FOLLOW_USER":
            return {
                ...state,
                users: changeById(
                    state.users, action.id, {followed: true}
                )
            }
        case 'usersReducer/UNFOLLOW_USER':
            return {
                ...state,
                users: changeById(
                    state.users, action.id, {followed: false})

            }
        case 'usersReducer/IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'usersReducer/ABLE_BUTTON':
            return {
                ...state,
                disableWhileRequest: state.disableWhileRequest.filter(
                    id => id !== action.id
                )
            }
        case 'usersReducer/DISABLE_BUTTON':
            return {
                ...state,
                disableWhileRequest: [...state.disableWhileRequest, action.id]
            }
        default:
            return state;
    }
}

export default UsersPageReducer;
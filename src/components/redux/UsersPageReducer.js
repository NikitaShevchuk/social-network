import {usersApi} from "./api";
import {changeById} from "./change-by-id";

const UPD_USERS = 'SET-USERS';
const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const CHANGE_PAGE = 'CHANGE_PAGE';
const IS_FETCHING = 'IS_FETCHING';
const DISABLE_BUTTON = 'DISABLE_BUTTON';
const ABLE_BUTTON = 'ABLE_BUTTON';

let initialState = {
    users: [],
    pageSize: 10,
    isFetching: true,
    disableWhileRequest: []
}


const UsersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPD_USERS:
            return {
                ...state,
                users: [...state.users, ...action.newUsers]
            }
        case FOLLOW_USER:
            return {
                ...state,
                users: changeById(state.users, action.id, {followed: true})
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: changeById(state.users, action.id, {followed: false})
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ABLE_BUTTON:
            return {
                ...state,
                disableWhileRequest: state.disableWhileRequest.filter( id => id !== action.id )
            }
        case DISABLE_BUTTON:
            return {
                ...state,
                disableWhileRequest: [...state.disableWhileRequest, action.id]
            }
        default:
            return state;
    }
}

export const updUsers = (newUsers) => ({type: UPD_USERS, newUsers })
export const followSuccessful = (id) => ({type: FOLLOW_USER, id})
export const unfollowSuccessful = (id) => ({type: UNFOLLOW_USER, id})
export const changePage = (newCurrentPage) => ({type: CHANGE_PAGE, newCurrentPage})
export const isFetchingFunc = (isFetching) => ({type: IS_FETCHING, isFetching})
export const disableButton = (id) => ({type: DISABLE_BUTTON, id})
export const ableButton = (id) => ({type: ABLE_BUTTON, id})

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(isFetchingFunc(true))
    let data = await usersApi.getUsers(currentPage, pageSize)
    dispatch(isFetchingFunc(false));
    dispatch(updUsers(data.items));
}

export const followUser = (id) => async (dispatch) => {
    dispatch(disableButton(id));
    let data = await usersApi.follow(id)
    if (data.resultCode === 0) {
        dispatch(followSuccessful(id));
    } else {
        console.log(data.message)
    }
    dispatch(ableButton(id));
}

export const unfollowUser = (id) => async (dispatch) => {
    dispatch(disableButton(id));
    let data = await usersApi.unfollow(id)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccessful(id));
    } else {
        console.log(data.message)
    }
    dispatch(ableButton(id));
}

export default UsersPageReducer;
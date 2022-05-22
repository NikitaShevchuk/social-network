const CHANGE_TEXT = 'CHANGE-TEXT';
const ADD_POST = 'ADD-POST';

let initState = {
    posts: [
        {
            id: 1,
            postText: 'text',
            likesCount: 0
        },
        {
            id: 2,
            postText: 'second post',
            likesCount: 0
        }
    ],
    postNewText: 'zalupa'
}

const postPageReducer = (state = initState, action) => {
    switch(action.type) {
        case CHANGE_TEXT:
            return {
                ...state,
                postNewText: action.newText
            }
        case ADD_POST:
            let newPost = {
                id: 3,
                postText: state.postNewText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                postNewText: ''
            }
        default:
            return state;
    }
}

export const changeTextActionCreator = (text) => {
    return {type: CHANGE_TEXT, newText: text}
}
export const addPostActionCreator = () => {
    return {type: ADD_POST}
}

export default postPageReducer;
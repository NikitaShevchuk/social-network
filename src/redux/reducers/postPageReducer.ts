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
    ]
}

const postPageReducer = (state = initState, action: any) => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                postText: action.newPost.postBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPost: any) => {
    return {type: ADD_POST, newPost}
}

export default postPageReducer;
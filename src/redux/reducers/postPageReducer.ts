const ADD_POST = 'ADD-POST';

const initState = {
    posts: [
        {
            id: 1,
            postText: 'This is a test post body. You will be able to add posts later.',
            likesCount: 0
        }
    ]
};

const postPageReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                postText: action.newPost.postBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        default:
            return state;
    }
};

export const addPostActionCreator = (newPost: any) => ({ type: ADD_POST, newPost });

export default postPageReducer;

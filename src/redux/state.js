import postPageReducer from "./reducers/postPageReducer";
import index from "./reducers/messagesReducer";

let renderTree = () => {
    console.log('rendered entire tree')
}

let store = {
    state: {
        postPage: {
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
            postNewText: 'post text'
        },
        messagesPage: {
            messages: [
                {id: 1, messageText: 'message text'},
                {id: 1, messageText: 'message text'}
            ],
            newMessageText: 'new message text'
        }
    },
    _changeNewText(text) {
        this.state.postPage.postNewText = text;
        renderTree(this);
    },
    _addPost() {
        let newPost = {
            id: 3,
            postText: this.state.postPage.postNewText,
            likesCount: 0
        };
        this.state.postPage.posts.unshift(newPost);
        this.state.postPage.postNewText = '';
        renderTree(this);
    },
    subscribe(observer) {
        renderTree = observer;
    },
    dispatch(action) {
        this.state.postPage = postPageReducer(this.state.postPage, action);
        this.state.messagesPage = index(this.state.messagesPage, action)
        renderTree(this);
    }
}

export default store;


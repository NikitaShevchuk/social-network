import React from "react";
import {Form, Field} from "react-final-form"
import {addPostActionCreator} from "../../redux/postPageReducer";


const NewPostForm = ({onSubmit}) => {
    return <Form onSubmit={onSubmit}
                 render={({handleSubmit}) => (
                     <form onSubmit={handleSubmit}>
                         <Field name={'postBody'} initialValue="What's new?" component={'textarea'}/>
                         <div className="attachments">
                             <div className="icons">
                                 <i className="fa fa-photo"/>
                                 <i className="fa fa-music"/>
                             </div>
                             <button className='add-butn'>Post</button>
                         </div>
                     </form>
                 )}
    />
}

const NewPost = ({addPostActionCreator}) => {

    const onSubmit = formData => {
        addPostActionCreator(formData)
    }
    return <div className="new-postbox">
        <div className="newpst-input">
            <NewPostForm onSubmit={onSubmit}/>
        </div>
    </div>
}

export default NewPost;
import React from "react";
import {Form, Field} from "react-final-form"


const NewPostForm = (props) => {
    return <Form onSubmit={props.onSubmit}
                 render={({handleSubmit}) => (
                     <form onSubmit={handleSubmit}>
                         <Field name={'postBody'} component={'textarea'}/>
                         <div className="attachments">
                             <ul>
                                 <li>
                                     <i className="fa fa-music"/>
                                     <label className="fileContainer">
                                         {/*<input type="file" />*/}
                                     </label>
                                 </li>
                                 <li>
                                     <button>Post</button>
                                 </li>
                             </ul>
                         </div>
                     </form>
                 )}
    />
}

class NewPost extends React.Component {

    onSubmit(formData) {
        console.log(formData)
    }

    render() {
        return <div className="new-postbox">
            <figure>
                <img src="images/resources/admin2.jpg" alt=""/>
            </figure>
            <div className="newpst-input">
                <NewPostForm onSubmit={this.onSubmit}/>
            </div>
        </div>
    }
}

export default NewPost;
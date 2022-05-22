import React from "react";
import NewPost from "./NewPost";


const Feed = (props) => {
    return (
        <div className="central-meta">
            <NewPost state={props.state} onPostChange={props.onPostChange} addPostAction={props.addPostAction} postNewText={props.postNewText}/>
            <div className="loadMore">
                {props.postList}
            </div>
        </div>
    )
}

export default Feed;
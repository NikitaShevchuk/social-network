import React from "react";
import NewPost from "./NewPost";


const Feed = (props) => {
    return (
        <>
            <div className="loadMore opacity-animation">
                <NewPost state={props.state} onPostChange={props.onPostChange}
                         addPostActionCreator={props.addPostActionCreator } postNewText={props.postNewText}
                         profileImg={props.profileImg}/>
                {props.postList}
            </div>
        </>
    )
}

export default Feed;
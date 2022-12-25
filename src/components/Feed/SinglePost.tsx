import React from "react";
import profileBackground from "../../common/assets/img/profileCover.jpg";

const SinglePost = (props: any) => {
    return (
        <div className="user-post">
            <div className="friend-info">
                <figure>
                    <img src={props.profileImg} alt="" />
                </figure>
                <div className="friend-name">
                    <ins>
                        <a href="#" title="">
                            {props.userName}
                        </a>
                    </ins>
                    <span>published: june,2 2018 19:PM</span>
                </div>
                <div className="post-meta">
                    <img src={profileBackground} alt="" />
                    <div className="description">
                        <p>{props.postText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;

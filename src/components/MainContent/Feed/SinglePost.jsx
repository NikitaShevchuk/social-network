import React from "react";
import profileBackground from "../../common/assets/img/profileCover.jpg";

const SinglePost = (props) => {
    return (
        <div className="user-post">
            <div className="friend-info">
                <figure>
                    <img src={props.profileImg} alt=""/>
                </figure>
                <div className="friend-name">
                    <ins><a href="time-line.html" title="">{props.userName}</a></ins>
                    <span>published: june,2 2018 19:PM</span>
                </div>
                <div className="post-meta">
                    <img src={profileBackground} alt=""/>
                    <div className="we-video-info">
                        <ul>
                            <li>
                                        <span className="views"
                                              title="views">
                                            <i className="fa fa-eye"></i>
                                            <ins>1.2k</ins>
                                        </span>
                            </li>
                            <li>
                                        <span className="comment"
                                              title="Comments">
                                            <i className="fa fa-comments-o"></i>
                                            <ins>52</ins>
                                        </span>
                            </li>
                            <li>
                                        <span className="like"
                                              title="like">
                                            <i className="ti-heart"></i>
                                            <ins>{props.likesCount}</ins>
                                        </span>
                            </li>
                            <li>
                                        <span className="dislike"
                                              title="dislike">
                                            <i className="ti-heart-broken"></i>
                                            <ins>200</ins>
                                        </span>
                            </li>
                        </ul>
                    </div>
                    <div className="description">
                        <p>
                            {props.postText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost;
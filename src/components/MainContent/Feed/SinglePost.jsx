import React from "react";

const SinglePost = (props) => {
    return (
        <div className="user-post">
            <div className="friend-info">
                <figure>
                    <img src="images/resources/friend-avatar10.jpg" alt=""/>
                </figure>
                <div className="friend-name">
                    <ins><a href="time-line.html" title="">Janice Griffith</a></ins>
                    <span>published: june,2 2018 19:PM</span>
                </div>
                <div className="post-meta">
                    <img src="images/resources/user-post.jpg" alt=""/>
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
                            <li className="social-media">
                                <div className="menu">
                                    <div className="btn trigger"><i className="fa fa-share-alt"></i></div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-html5"></i></a></div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-facebook"></i></a></div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-google-plus"></i></a></div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-twitter"></i></a></div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-css3"></i></a></div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-instagram"></i></a>
                                        </div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-dribbble"></i></a>
                                        </div>
                                    </div>
                                    <div className="rotater">
                                        <div className="btn btn-icon"><a href="#" title=""><i
                                            className="fa fa-pinterest"></i></a>
                                        </div>
                                    </div>

                                </div>
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
// import {createSelector} from "reselect";
// import {NavLink} from "react-router-dom";
// import userIcon from "../../common/assets/img/userIcon.jpg";
// import React from "react";
//
// const getUsers = state => state.usersPage.users
// const getDisableWhileRequest = state => state.usersPage.disableWhileRequest
// const getFollowUser = state => state.usersPage.followUser
// const getUnfollowUser = state => state.usersPage.unfollowUser
//
// export const usersSelector = createSelector([getUsers, getDisableWhileRequest, getFollowUser, getUnfollowUser], (users, disabledButtons, followUser, unfollowUser) => {
//     return users.map(user => <div key={user.id} className='opacity-animation'>
//             <NavLink to={`/profile/${user.id}`} className="nearly-pepls">
//                 <figure>
//                     <img src={user.photos.small ? user.photos.small : userIcon}
//                          alt=""/>
//                 </figure>
//                 <div className="pepl-info">
//                     <h4>{user.name}</h4>
//                     <span>{user.status}</span>
//                 </div>
//             </NavLink>
//             {user.followed ?
//                 <button title="" className="add-butn"
//                         onClick={() => {
//                             followUser(user.id)
//                         }}
//                         disabled={disabledButtons.some(item => item === user.id)}
//                 >Unfollow</button> :
//                 <button title="" className="add-butn"
//                         onClick={() => {
//                             unfollowUser(user.id)
//                         }}
//                         disabled={disabledButtons.some(item => item === user.id)}
//                 >Follow</button>
//             }
//         </div>
//     )
// })
import React, {memo} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../common/assets/img/userIcon.jpg'
import {Form, Field} from "react-final-form";
import {required} from "../../common/validators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {isSearchFieldEmpty} from "../../common/FormControl";

const Users = ({
                   loadUsers, users, unfollowUserEvent, followUserEvent, disableWhileRequest,
                   isFetching, searchSubmit, ...props
               }) => {

    if (!users) return <Preloader/>
    return <>
        <div className="search-users">
            <FontAwesomeIcon icon={faSearch}/>
            <Form
                onSubmit={searchSubmit}
                render={({handleSubmit, submitting, pristine, form}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name='searchBody' autoFocus validate={required} onKeyUp={(e) => {
                            isSearchFieldEmpty(e, form, props.getUsers, 1, props.pageSize)
                            form.submit()
                        }}
                               component={'input'} placeholder='Search users' className="search-users__input"/>
                    </form>
                )}
            />
        </div>
        <div className="nearby-contct" onScroll={loadUsers}>
            {users.map(user => <div key={user.id} className='opacity-animation'>
                    <NavLink to={`${ props.getDialog ? `/messages/${user.id}/` : `/profile/${user.id}` }`}
                             onClick={() => {
                                 if (props.getDialog) {
                                     props.getDialog(user.id)
                                     props.setSearchMode(false)
                                 }
                             }}
                             className="nearly-pepls">
                        <figure>
                            <img src={user.photos.small ? user.photos.small : userIcon}
                                 alt=""/>
                        </figure>
                        <div className="pepl-info">
                            <h4>{user.name}</h4>
                            <span>{user.status}</span>
                        </div>
                    </NavLink>
                    <button title="" className="add-butn"
                            onClick={() => user.followed ? unfollowUserEvent(user.id) : followUserEvent(user.id)}
                            disabled={disableWhileRequest.some(item => item === user.id)}>
                        {user.followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            )}
            {isFetching ? <Preloader/> : null}
        </div>
    </>
}

export default memo(Users);
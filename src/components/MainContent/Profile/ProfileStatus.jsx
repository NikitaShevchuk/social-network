import React, {useEffect, useState} from "react";

const ProfileStatus = ({isMyProfile, updStatusThunk, setMyStatus,...props}) => {

    let [status, setStatus] = useState(props.status);

    let [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        if (isMyProfile) setEditMode(true)
    }
    const exitEditMode = () => {
        setEditMode(false)
        if (props.status !== status) updStatusThunk(status);
        setMyStatus(status)
    }
    const changeStatusText = (e) => {
        setStatus(e.target.value)
    }
    const changeStatusTextOnEnter = (e) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            if (props.status !== status) updStatusThunk(status);
            setMyStatus(status)
        }
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    return <>
        {editMode &&
            <input type="text"
                   onChange={changeStatusText}
                   onBlur={exitEditMode}
                   autoFocus
                   onKeyDown={changeStatusTextOnEnter}
                   value={
                       status === null ?
                           'Add your status' :
                           status
                   }/>
        }
        {!editMode &&
            <span className='profile-status' onClick={enterEditMode}>{
                props.status === null || props.status === '' ?
                    '' :
                    props.status
            }
                {isMyProfile ? <i style={{marginLeft: '7px'}} className="fa fa-pencil"/> : ''}</span>
        }
    </>

}

export default ProfileStatus;
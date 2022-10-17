import React, {FC, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilSquare} from "@fortawesome/free-solid-svg-icons";

interface Props {
    updStatusThunk: (newStatus: string) => void
    status: string | null
    isMyProfile: boolean
}

const ProfileStatus: FC<Props> = ({
    updStatusThunk, status, isMyProfile
}) => {
    const [localStatus, setLocalStatus] = useState<string | null>(status);
    const [editMode, setEditMode] = useState<boolean>(false);
    const updateStatus = () => {
        setEditMode(false)
        const shouldUpdateStatus = status !== localStatus && !!localStatus
        if (shouldUpdateStatus) updStatusThunk(localStatus)
    }
    const enterEditMode = () => isMyProfile && setEditMode(true)
    const changeStatusText = (e: React.ChangeEvent<HTMLInputElement>) => setLocalStatus(e.target.value)
    const changeStatusTextOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') updateStatus()
    }
    useEffect(() => {setLocalStatus(status)}, [status])
    return <div className='status__wrapper'>
        {editMode &&
            <input
                type="text"
                onChange={changeStatusText}
                onBlur={updateStatus}
                autoFocus
                onKeyDown={changeStatusTextOnEnter}
                value={localStatus ? localStatus : ''}
            />
        }
        {!editMode &&
            <span
                className='profile-status'
                onClick={enterEditMode}
            >
                {isMyProfile &&
                    <FontAwesomeIcon
                        icon={faPencilSquare}
                        style={{marginRight: '7px'}}
                        size='xs'
                    />
                }
                {!status && isMyProfile && 'add status'}
                {status}
            </span>
        }
    </div>
}
export default ProfileStatus;
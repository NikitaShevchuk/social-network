import React, {useRef, useState, FC} from 'react';
import {Field} from "react-final-form"
import {isLink} from "../../../common/helpers/final-form/validators";
import {Input} from "../../../common/commonComponents/FormControl/FormControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from './Profile.module.css'
import {NavLink} from "react-router-dom";
import {Icontacts} from "../../../types/profileTypes";
import useOnClickOutside from "../../../hooks/onClickOutside";

type AdditionalProfileInfoProps = {
    contacts: Icontacts
    unfollowUserProfile?: () => void
    followUserProfile?: () => void
    isMyProfile: boolean
    submitting?: boolean
    pristine?: boolean
    setProfileEditMode: (editMode: boolean) => void
    userId?: number
    followed?: boolean
    profileEditMode: boolean
    disableWhileRequest?: boolean
}

const AdditionalProfileInfo: FC<AdditionalProfileInfoProps> = ({
    contacts, setProfileEditMode, userId,
    isMyProfile, profileEditMode, followed,
    unfollowUserProfile, followUserProfile,
    submitting, pristine, disableWhileRequest
}) => {
    let toggleSubmenu = useRef(null);
    let [editSocialMedia, setEditSocialMedia] = useState(false)
    // @ts-ignore
    const contactsArray = Object.keys(contacts).map(key => [key, contacts[key]])
    const hasAnyLink = Object.values(contacts).find(item => item !== null);
    const disableEditMode = () => setProfileEditMode(false)
    const enterEditMode = () => setProfileEditMode(true)
    useOnClickOutside(toggleSubmenu, setEditSocialMedia, editSocialMedia)
    return <div className="additional-profile-info">
        {hasAnyLink || profileEditMode ?
            <div className="social-media">
                {contactsArray.map((item) => {
                    if (!item[1] || item[0] === 'vk') return ''
                    return <div className='social-media__element' key={contactsArray.indexOf(item)}>
                        <a href={`${item[1]}`} target='_blank'><FontAwesomeIcon icon={['fab', `fa-${item[0]}` as any]}/></a></div>
                })}
                {profileEditMode &&
                    <div ref={toggleSubmenu}>
                        <div className='edit-social-media' onClick={() => setEditSocialMedia(!editSocialMedia)}>
                            <FontAwesomeIcon icon={['fas', 'fa-angle-down' as any]}/>
                        </div>
                        <div className={editSocialMedia ? style.additionalInfActive : style.additionalInf}>
                            {contactsArray.map(item => {
                                if (item[0] === 'website' || item[0] === 'vk' || item[0] === 'mainLink') return ''
                                return <Field name={item[0]}
                                              label={item[0]}
                                              initialValue={item[1]}
                                              component={Input}
                                              validate={isLink}
                                              key={contactsArray.indexOf(item)}/>
                            })}
                        </div>
                    </div>
                }
            </div> : ''
        }
        {isMyProfile ?
            profileEditMode ?
                <>
                    <button
                        type='submit'
                        disabled={submitting || pristine}
                        className="add-butn"
                    >
                        Save
                    </button>
                    <button
                        onClick={disableEditMode}
                        className="add-butn white"
                    >
                        Cancel
                    </button>
                </>
                :
                <button
                    onClick={enterEditMode}
                    className="add-butn"
                >
                    Edit profile
                </button>
            :
            <>
                <button
                    title=""
                    className="add-butn"
                    disabled={disableWhileRequest}
                    onClick={followed ? unfollowUserProfile : followUserProfile}
                >
                    {followed ? 'Unfollow' : 'Follow'}
                </button>
                <NavLink
                    replace to={`/messages/${userId}`}
                    className="add-butn whiteBg"
                >
                    Message
                </NavLink>
            </>
        }
    </div>
};

export default AdditionalProfileInfo;
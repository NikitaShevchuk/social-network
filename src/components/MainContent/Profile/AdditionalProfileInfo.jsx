import React, {useRef, useState, useEffect} from 'react';
import {Field} from "react-final-form"
import {isLink} from "../../common/validators";
import {Input} from "../../common/FormControl";

const AdditionalProfileInfo = ({
                                   contacts, setProfileEditMode,
                                   isMyProfile, profileEditMode, followed,
                                   unfollowUserProfile, followUserProfile,
                                   submitting, pristine, disableWhileRequest
                               }) => {
    let toggleSubmenu = useRef();
    let [editSocialMedia, setEditSocialMedia] = useState(false)
    const contactsArray = Object.keys(contacts).map(key => [key, contacts[key]])
    useEffect(() => {
        let clickOutsideElement = e => {
            if (editSocialMedia && toggleSubmenu.current && !toggleSubmenu.current.contains(e.target)) {
                setEditSocialMedia(false)
            }
        }
        document.addEventListener('mousedown', clickOutsideElement)
        return () => {
            document.removeEventListener('mousedown', clickOutsideElement)
        }
    }, [editSocialMedia])
    return <div className="additional-profile-info">
        <div className="social-media">
            {contactsArray.map(item => {
                if (item[1] === null || item[1] === '' || item[0] === 'vk') return ''
                return <div className='social-media__element' key={contactsArray.indexOf(item)}><a
                    href={`${item[1]}`}
                    target='_blank'
                ><i className={`ti-${item[0]}`}/></a></div>
            })}
            {profileEditMode &&
                <div className='edit-social-media' onClick={() => setEditSocialMedia(!editSocialMedia)}><i
                    className="fa fa-chevron-down"></i></div>
            }
            {editSocialMedia &&
                <div className={`user-nav__subnav active`} ref={toggleSubmenu}>
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
            }
        </div>
        {isMyProfile ?
            profileEditMode ?
                <>
                    <button type='submit' disabled={submitting || pristine} className="add-butn">Save</button>
                    <button onClick={() => setProfileEditMode(false)} className="add-butn white">Cancel</button>
                </>
                :
                <button onClick={() => setProfileEditMode(true)} className="add-butn">Edit profile</button>
            :
            followed ?
                <button title="" className="add-butn" disabled={disableWhileRequest}
                        onClick={unfollowUserProfile}>Unfollow</button>
                :
                <button title="" className="add-butn" disabled={disableWhileRequest}
                        onClick={followUserProfile}>Follow</button>
        }
    </div>
};

export default AdditionalProfileInfo;
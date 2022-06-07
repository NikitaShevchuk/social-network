import React, {useState} from 'react';
import {Form, Field} from "react-final-form"
import ProfileStatus from "./ProfileStatus";
import style from "./Profile.module.css";
import {maxLengthCreator, minLengthCreator, required} from "../../common/validators";
import {Input} from "../../common/FormControl";
import AdditionalProfileInfo from "./AdditionalProfileInfo";

const EditProfile = ({setProfileEditMode, isMyProfile,
                         status, profile, myId,
                         updateProfile, updStatusThunk, profileEditMode,
                         disableWhileRequest
                     }) => {
    const onSubmit = (formData) => {
        updateProfile({...formData, contacts: {
                github: formData.github,
                vk: null,
                facebook: formData.facebook,
                instagram: formData.instagram,
                twitter: formData.twitter,
                website: null,
                youtube: formData.youtube,
                mainLink: null
            }})
        setProfileEditMode(false)
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    let minLength4 = minLengthCreator(4);
    let maxLength20 = maxLengthCreator(20);
    let maxLength120 = maxLengthCreator(120);
    let [lookingForAJobState, setLookingFoAJobState] = useState(profile.lookingForAJob)
    return <>
        <Form onSubmit={onSubmit} render={ ({handleSubmit, submitting, pristine}) => (
            <form className='' onSubmit={handleSubmit}>
                <div className="admin-name timeline-info__row">
                    <Field name='userId' type='hidden' component='input' initialValue={myId} />
                    <h5><Field name='fullName'
                               validate={composeValidators(required, minLength4, maxLength20)}
                               initialValue={ profile.fullName }
                               component={Input} /></h5>
                    <Field name='aboutMe' component='input' type='hidden' initialValue={status}/>
                    <ProfileStatus isMyProfile={false}
                                   status={status}
                                   updStatusThunk={updStatusThunk}/>
                </div>
                <AdditionalProfileInfo
                    contacts={profile.contacts} setProfileEditMode={setProfileEditMode}
                isMyProfile={isMyProfile} profileEditMode={profileEditMode}
                submitting={submitting} pristine={pristine} disableWhileRequest={disableWhileRequest}
                />
                <div className='timeline-info__row'>
                    <div className="lookingForAJob">
                        <div className='lookingForAJobDescription-edit'>
                            <Field name='lookingForAJobDescription'
                                   validate={composeValidators(maxLength120)}
                                   initialValue={profile.lookingForAJobDescription}
                                   component={Input} />
                        </div>
                        <div onClick={() => setLookingFoAJobState(!lookingForAJobState)}
                             className={`${lookingForAJobState ? style.green : style.red}`}>
                            <label htmlFor="job">Looking fo a job</label>
                            <Field name='lookingForAJob' id='job'
                                   initialValue={profile.lookingForAJob}
                                   type='checkbox' label='Looking for a job'
                                   component='input' />
                        </div>
                    </div>
                </div>
            </form>
        ) } />
    </>
};

export default EditProfile;
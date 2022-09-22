import React, {FC, memo, useState} from 'react';
import {Form, Field} from "react-final-form"
import ProfileStatus from "../../../common/commonComponents/ProfileStatus/ProfileStatus";
import style from "./Profile.module.css";
import {maxLengthCreator, minLengthCreator, required} from "../../../common/helpers/final-form/validators";
import {Input} from "../../../common/commonComponents/FormControl/FormControl";
import AdditionalProfileInfo from "./AdditionalProfileInfo";
import {IProfileProps} from "./Profile";
import ProfileStatusContainer from "../../../common/commonComponents/ProfileStatus/ProfileStatusContainer";

interface EditProfileProps extends IProfileProps {
    setProfileEditMode: (profileEditMode: boolean) => void
    isMyProfile: boolean
    profileEditMode: boolean
}

const EditProfile: FC<EditProfileProps> = memo(({
    setProfileEditMode, isMyProfile,
    status, profile, myId, updateProfile, profileEditMode, disableWhileRequest
}) => {
    const onSubmit = (formData: any) => {
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
    const composeValidators = (...validators: any) => (value: string) =>
        validators.reduce((error: string, validator: (value: string) => string | undefined ) => error || validator(value), undefined)
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
                    <ProfileStatusContainer isMyProfile={false} />
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
});

export default EditProfile;
import React, {useState} from 'react';
import {Form, Field} from "react-final-form"
import ProfileStatus from "./ProfileStatus";
import style from "./Profile.module.css";
import {maxLengthCreator, minLengthCreator, required} from "../../common/validators";
import {Input} from "../../common/FormControl";

const EditProfile = ({setProfileEditMode, isMyProfile,profile, myId,...props}) => {
    const onSubmit = (formData) => {
        props.updateProfile({...formData, contacts: {
                github: 'https://github.com/NikitaShevchuk/my-app/',
                vk: 'https://vk.com/',
                facebook: 'https://www.facebook.com/',
                instagram: 'https://www.instagram.com/',
                twitter: 'https://twitter.com/',
                website: 'https://www.shevchuknikita.space/',
                youtube: 'https://www.youtube.com/',
                mainLink: 'https://www.youtube.com/',
            }})
        setProfileEditMode(false)
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    let minLength4 = minLengthCreator(4);
    let maxLength20 = maxLengthCreator(20);
    let maxLength90 = maxLengthCreator(90);
    let [lookingFoAJobState, setLookingFoAJobState] = useState(profile.lookingFoAJob)
    return <>
        <Form onSubmit={onSubmit} render={ ({handleSubmit, submitting, pristine, form}) => (
            <form onSubmit={handleSubmit}>
                <div className="admin-name timeline-info__row">
                    <Field name='userId' type='hidden' component='input' initialValue={myId} />
                    <h5><Field name='fullName' validate={composeValidators(required, minLength4, maxLength20)} initialValue={ profile.fullName } component={Input} /></h5>
                    <Field name='aboutMe' type="text" validate={composeValidators(required, minLength4, maxLength20)} initialValue={ props.status } component={Input}/>
                </div>
                <button type='submit' disabled={submitting || pristine} className="add-butn">Save</button>
                <button onClick={() => setProfileEditMode(false)} className="add-butn white">Cancel</button>
                <div className='timeline-info__row'>
                    <div className="lookingFoAJob">
                        <div onClick={() => setLookingFoAJobState(!lookingFoAJobState)} className={`${lookingFoAJobState ? style.green : style.red}`}>
                            <label htmlFor="job">Looking fo a job</label>
                            <Field name='lookingFoAJob' id='job' initialValue={profile.lookingFoAJob} type='checkbox' label='Looking for a job' component='input' />
                        </div>
                        <div className='lookingForAJobDescription-edit'>
                            <Field name='lookingForAJobDescription' validate={composeValidators(maxLength90)} initialValue={profile.lookingForAJobDescription} component={Input} />
                        </div>
                    </div>
                </div>
            </form>
        ) } />
    </>
};

export default EditProfile;
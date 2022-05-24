import React from 'react';
import {Form, Field} from "react-final-form"
import ProfileStatus from "./ProfileStatus";
import style from "./Profile.module.css";
import {maxLengthCreator, minLengthCreator, required} from "../../common/validators";
import {Input} from "../../common/FormControl";

const EditProfile = ({setProfileEditMode, isMyProfile,profile, myId,...props}) => {
    const onSubmit = (formData) => {
        debugger
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    let minLength4 = minLengthCreator(4);
    let maxLength20 = maxLengthCreator(20);
    let maxLength90 = maxLengthCreator(90);
    return <>
        <Form onSubmit={onSubmit} render={ ({handleSubmit, submitting, pristine, form}) => (
            <form onSubmit={handleSubmit}>
                <div className="admin-name timeline-info__row">
                    <Field name='userId' type='hidden' component='input' initialValue={myId} />
                    <h5><Field name='fullName' validate={composeValidators(required, minLength4, maxLength20)} initialValue={profile.fullName} label='Name' component={Input} /></h5>
                    <ProfileStatus isMyProfile={isMyProfile} status={props.status}
                                   updStatusThunk={props.updStatusThunk}/>
                </div>
                <button type='submit' disabled={submitting || pristine} className="add-butn">Save</button>
                <button onClick={() => setProfileEditMode(false)} className="add-butn white">Cancel</button>
                <div className='timeline-info__row'>
                    <div className="lookingFoAJob">
                        <div className={`${profile.lookingFoAJob ? style.green : style.red}`}>
                            <Field name='lookingFoAJob' type='checkbox' label='Looking for a job' component='input' />
                        </div>
                        <div>
                            {profile.lookingFoAJobDescription}
                            <Field name='lookingFoAJobDescription' validate={composeValidators(maxLength90)} initialValue=' ' label='Description' component={Input} />
                        </div>
                    </div>
                </div>
            </form>
        ) } />
    </>
};

export default EditProfile;
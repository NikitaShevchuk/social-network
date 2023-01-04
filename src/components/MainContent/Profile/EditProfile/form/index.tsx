import React, { FC, forwardRef, LegacyRef } from 'react';
import { AnyObject } from 'react-final-form';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileStatusContainer from '../../../../../common/ProfileStatus/ProfileStatusContainer';
import style from '../../Profile.module.scss';
import { useGetFields } from '../utils';
import { ContactsArray } from '../../../../../types/ProfileTypes';
import Links from './Links';

type EventType =
    | Partial<Pick<React.SyntheticEvent<Element, Event>, 'preventDefault' | 'stopPropagation'>>
    | undefined;

interface Props {
    handleSubmit: (event?: EventType) => Promise<AnyObject | undefined> | undefined;
    pristine: boolean;
    submitting: boolean;
    isMyProfile: boolean;
    profileEditMode: boolean;
    socialMediaEditMode: boolean;
    setSocialMediaEditMode: (isInEditMode: boolean) => void;
    disableEditMode: () => void;
    contactsArray: ContactsArray;
    ref: any;
}

const EditProfileForm: FC<Props> = forwardRef(
    (
        {
            submitting,
            pristine,
            handleSubmit,
            disableEditMode,
            isMyProfile,
            profileEditMode,
            socialMediaEditMode,
            setSocialMediaEditMode,
            contactsArray
        },
        ref
    ) => {
        const { fullNameField, userIdField, jobDescriptionField, jobCheckBox, aboutMeField } =
            useGetFields();
        const formClassName = profileEditMode ? 'profile-data shown' : 'profile-data hidden';
        return (
            <form
                className={classNames(formClassName, 'edit-profile-form')}
                onSubmit={handleSubmit}
                ref={ref as LegacyRef<HTMLFormElement> | undefined}
            >
                <div className="admin-name timeline-info__row">
                    {userIdField}
                    <h5>{fullNameField}</h5>
                    <ProfileStatusContainer isMyProfile={isMyProfile} />
                </div>
                <div className="timeline-info__row">
                    <div className="lookingForAJob">
                        <div className="small-subtitle">
                            <FontAwesomeIcon icon={'fa-solid fa-address-card' as any} />
                            <span className="text">About:</span>
                            {aboutMeField}
                        </div>
                        <div className="lookingForAJobDescription-edit">{jobDescriptionField}</div>
                        <div className={style.jobStyle}>
                            <FontAwesomeIcon
                                icon={`fa fa-briefcase` as any}
                                className={style.icon}
                            />
                            <span>Job status:</span>
                            {jobCheckBox}
                        </div>
                    </div>
                </div>
                <div className="edit-profile-buttons">
                    <button type="submit" disabled={submitting || pristine} className="add-butn">
                        Save
                    </button>
                    <button type="button" onClick={disableEditMode} className="add-butn white">
                        Cancel
                    </button>
                </div>
                <Links
                    contactsArray={contactsArray}
                    socialMediaEditMode={socialMediaEditMode}
                    setSocialMediaEditMode={setSocialMediaEditMode}
                />
            </form>
        );
    }
);

export default EditProfileForm;

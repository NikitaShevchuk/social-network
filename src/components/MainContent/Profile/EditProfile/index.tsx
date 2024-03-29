import React, { FC, ForwardedRef, memo, useRef } from 'react';
import { Form } from 'react-final-form';
import { connect, ConnectedProps } from 'react-redux';
import {
    EditProfileFormValues,
    EditProfilePutRequestData,
    Profile
} from '../../../../types/ProfileTypes';
import { createUpdatedProfile, validateInitialValues } from './utils';
import EditProfileForm from './form';
import { RootState } from '../../../../redux/redux-store';
import { updateProfile } from '../../../../redux/reducers/profile-reducer/middleware';
import { setProfileEditMode } from '../../../../redux/reducers/profile-reducer/actions';

interface Props extends EditProfileConnectedProps {
    updateProfile: (updatedProfile: EditProfilePutRequestData) => void;
    profile: Profile;
    profileEditMode: boolean;
    isMyProfile: boolean;
}

const EditProfile: FC<Props> = memo(
    ({
        updateProfile,
        isMyProfile,
        profile,
        contactsArray,
        setProfileEditMode,
        profileEditMode
    }) => {
        const toggleSubmenu = useRef<ForwardedRef<HTMLFormElement | null>>(null);

        const onSubmit = (formData: EditProfileFormValues) => {
            const updatedProfile = createUpdatedProfile(formData);
            updateProfile(updatedProfile);
            setProfileEditMode(false);
        };
        const disableEditMode = () => setProfileEditMode(false);
        return (
            <Form
                initialValues={validateInitialValues({ ...profile, ...profile.contacts })}
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, pristine }) => (
                    <EditProfileForm
                        ref={toggleSubmenu}
                        pristine={pristine}
                        submitting={submitting}
                        handleSubmit={handleSubmit}
                        isMyProfile={isMyProfile}
                        profileEditMode={profileEditMode}
                        disableEditMode={disableEditMode}
                        contactsArray={contactsArray}
                    />
                )}
            />
        );
    }
);

const mapStateToProps = (state: RootState) => ({
    contactsArray: state.profilePage.contactsArray
});

const connector = connect(mapStateToProps, {
    updateProfile,
    setProfileEditMode
});
export default connector(EditProfile);
type EditProfileConnectedProps = ConnectedProps<typeof connector>;

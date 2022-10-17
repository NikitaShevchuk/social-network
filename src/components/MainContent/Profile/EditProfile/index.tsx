import React, {FC, ForwardedRef, memo, useRef} from 'react';
import {Form} from "react-final-form"
import {
    EditProfileFormValues,
    EditProfilePutRequestData,
    Profile
} from "../../../../types/ProfileTypes";
import {createUpdatedProfile} from "./utils";
import EditProfileForm from "./EditProfileForm";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../../redux/redux-store";
import {updateProfile} from "../../../../redux/reducers/profileReducer/middleware";
import {setProfileEditMode, setSocialMediaEditMode} from "../../../../redux/reducers/profileReducer/actions";

interface Props extends EditProfileConnectedProps {
    updateProfile: (updatedProfile: EditProfilePutRequestData) => void
    profile: Profile
    profileEditMode: boolean
    isMyProfile: boolean
}

const EditProfile: FC<Props> = memo(({
    updateProfile, isMyProfile, profile, setSocialMediaEditMode, contactsArray,
    setProfileEditMode, profileEditMode, socialMediaEditMode
}) => {
    const toggleSubmenu = useRef<ForwardedRef<HTMLFormElement | null>>(null);

    const onSubmit = (formData: EditProfileFormValues) => {
        const updatedProfile = createUpdatedProfile(formData)
        updateProfile(updatedProfile)
        setProfileEditMode(false)
    }
    const disableEditMode = () => setProfileEditMode(false)
    return <>
        <Form
            initialValues={profile}
            onSubmit={onSubmit}
            render={({handleSubmit, submitting, pristine}) => (
                <EditProfileForm
                    ref={toggleSubmenu}
                    pristine={pristine}
                    submitting={submitting}
                    handleSubmit={handleSubmit}

                    lookingForAJob={profile.lookingForAJob}
                    isMyProfile={isMyProfile}
                    profileEditMode={profileEditMode}
                    disableEditMode={disableEditMode}
                    socialMediaEditMode={socialMediaEditMode}
                    contactsArray={contactsArray}
                />
            )}
        />
    </>
});

const mapStateToProps = (state: RootState) => ({
    socialMediaEditMode: state.profilePage.socialMediaEditMode,
    contactsArray: state.profilePage.contactsArray
})

const connector = connect(mapStateToProps, {updateProfile, setProfileEditMode, setSocialMediaEditMode})
export default connector(EditProfile);
type EditProfileConnectedProps = ConnectedProps<typeof connector>
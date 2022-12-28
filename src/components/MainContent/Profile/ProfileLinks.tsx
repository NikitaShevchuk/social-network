import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contacts, ContactsArray } from "../../../types/ProfileTypes";
import { useCreateIcons } from "./EditProfile/utils";
import { faPencilSquare, faClose } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../redux/redux-store";
import { connect, ConnectedProps } from "react-redux";
import { setSocialMediaEditMode } from "../../../redux/reducers/profile-reducer/actions";

interface Props extends ProfileLinksConnectedProps {
    contactsArray: ContactsArray;
    profileEditMode: boolean;
    contacts: Contacts;
}

const ProfileLinks: FC<Props> = ({
    contactsArray,
    profileEditMode,
    contacts,
    socialMediaEditMode,
    setSocialMediaEditMode,
}) => {
    const toggleSocialMediaEditMode = () =>
        profileEditMode && setSocialMediaEditMode(!socialMediaEditMode);

    const hasAnyLink = Object.values(contacts).find(
        (contact) => contact !== null
    );
    const contactIcons = useCreateIcons(contactsArray);
    if (!hasAnyLink && !profileEditMode) return <span></span>;

    return (
        <div className="additional-profile-info">
            <div className="social-media">
                {contactIcons}
                {!hasAnyLink && profileEditMode && (
                    <span className="text">Add your social media links</span>
                )}
                {profileEditMode && (
                    <div
                        className={`edit-social-media ${
                            socialMediaEditMode ? "close-icon" : "edit-icon"
                        }`}
                        onClick={toggleSocialMediaEditMode}
                    ></div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    socialMediaEditMode: state.profilePage.socialMediaEditMode,
    contactsArray: state.profilePage.contactsArray,
});
const connector = connect(mapStateToProps, { setSocialMediaEditMode });
export default connector(ProfileLinks);
type ProfileLinksConnectedProps = ConnectedProps<typeof connector>;

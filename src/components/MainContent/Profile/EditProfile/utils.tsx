import {
    Contacts,
    ContactsArray,
    EditProfileFormValues,
    SocialMediaName,
} from "../../../../types/ProfileTypes";
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    createCheckBox,
    createHiddenInput,
    createInput,
    createTextArea,
} from "../../../../common/helpers/createField";
import { required } from "../../../../common/helpers/validators";
import {
    maxLength120,
    maxLength20,
    minLength4,
} from "../../../../common/helpers/createValidators";

export const createUpdatedProfile = (formData: EditProfileFormValues) => ({
    ...formData,
    contacts: {
        github: formData.github,
        vk: null,
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter,
        website: null,
        youtube: formData.youtube,
        mainLink: null,
    },
});

const shouldNotShowContact = (name: string, link: string | null) => {
    return !link || name === "vk" || name === "website" || name === "mainLink";
};

export const useCreateIcons = (contactsArray: ContactsArray) => {
    const contactIcons = useMemo(
        () =>
            contactsArray.map((singleContact) => {
                const name = singleContact[0];
                const link = singleContact[1];
                if (shouldNotShowContact(name, link)) return "";
                return (
                    <div
                        className="social-media__element"
                        key={contactsArray.indexOf(singleContact)}
                    >
                        <a href={`${link}`} target="_blank">
                            <FontAwesomeIcon
                                icon={["fab", `fa-${name}` as any]}
                            />
                        </a>
                    </div>
                );
            }),
        [contactsArray]
    );
    return contactIcons;
};

export const useGetFields = () =>
    useMemo(() => {
        const userIdField = createHiddenInput("userId");
        const jobCheckBox = createCheckBox("lookingForAJob", null);
        const jobDescriptionField = createTextArea(
            [maxLength120],
            "lookingForAJobDescription"
        );
        const fullNameField = createInput(
            [required, minLength4, maxLength20],
            "text",
            "fullName"
        );
        const aboutMeField = createInput([maxLength120], "text", "aboutMe");
        return {
            fullNameField,
            userIdField,
            jobDescriptionField,
            jobCheckBox,
            aboutMeField,
        };
    }, []);

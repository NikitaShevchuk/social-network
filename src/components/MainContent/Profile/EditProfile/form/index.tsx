import React, { FC, forwardRef, LegacyRef, useState } from "react";
import { AnyObject } from "react-final-form";
import ProfileStatusContainer from "../../../../../common/ProfileStatus/ProfileStatusContainer";
import style from "../../Profile.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetFields } from "../utils";
import { ContactsArray } from "../../../../../types/ProfileTypes";
import { createFieldWithInitVal } from "../../../../../common/helpers/createField";
import { isLink } from "../../../../../common/helpers/validators";

type EventType =
    | Partial<
          Pick<
              React.SyntheticEvent<Element, Event>,
              "preventDefault" | "stopPropagation"
          >
      >
    | undefined;

interface Props {
    handleSubmit: (
        event?: EventType
    ) => Promise<AnyObject | undefined> | undefined;
    pristine: boolean;
    submitting: boolean;
    lookingForAJob: boolean;
    isMyProfile: boolean;
    profileEditMode: boolean;
    socialMediaEditMode: boolean;
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
            lookingForAJob,
            isMyProfile,
            profileEditMode,
            socialMediaEditMode,
            contactsArray,
        },
        ref
    ) => {
        const {
            fullNameField,
            userIdField,
            jobDescriptionField,
            jobCheckBox,
            aboutMeField,
        } = useGetFields();
        const [lookingForAJobState, setLookingFoAJobState] =
            useState<boolean>(lookingForAJob);
        const toggleJobState = () =>
            setLookingFoAJobState(!lookingForAJobState);

        const jobBlockClassName = lookingForAJobState ? style.green : style.red;
        const formClassName = profileEditMode
            ? "profile-data shown"
            : "profile-data hidden";
        const editSocialMediaClassName = socialMediaEditMode
            ? style.additionalInfActive
            : style.additionalInf;
        return (
            <form
                className={classNames(formClassName, "edit-profile-form")}
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
                            <FontAwesomeIcon
                                icon={"fa-solid fa-address-card" as any}
                            />
                            <span className="text">About:</span>
                            {aboutMeField}
                        </div>
                        <div className="lookingForAJobDescription-edit">
                            {jobDescriptionField}
                        </div>
                        <div
                            className={style.jobStyle}
                            onClick={toggleJobState}
                        >
                            <FontAwesomeIcon
                                icon={`fa fa-briefcase` as any}
                                className={style.icon}
                            />
                            <label htmlFor="lookingForAJob">Job status:</label>
                            <label
                                className={jobBlockClassName}
                                htmlFor="lookingForAJob"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                }}
                            >
                                {lookingForAJobState
                                    ? ` looking for a job`
                                    : ` not interested in job`}
                            </label>
                            {jobCheckBox}
                        </div>
                    </div>
                </div>
                <div className="edit-profile-buttons">
                    <button
                        type="submit"
                        disabled={submitting || pristine}
                        className="add-butn"
                    >
                        Save
                    </button>
                    <button
                        onClick={disableEditMode}
                        className="add-butn white"
                    >
                        Cancel
                    </button>
                </div>
                <div
                    className={classNames(
                        editSocialMediaClassName,
                        "links-form"
                    )}
                >
                    {contactsArray.map((singleContact) => {
                        const contactName = singleContact[0];
                        const shouldReturnEmpty =
                            contactName === "website" ||
                            contactName === "vk" ||
                            contactName === "mainLink";
                        if (shouldReturnEmpty) return "";

                        return createFieldWithInitVal(
                            [isLink],
                            singleContact[0],
                            contactsArray.indexOf(singleContact),
                            singleContact[1] as string
                        );
                    })}
                </div>
            </form>
        );
    }
);

export default EditProfileForm;

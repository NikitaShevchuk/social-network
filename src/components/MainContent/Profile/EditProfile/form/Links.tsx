import React, { FC, useRef } from "react";
import { ContactsArray } from "../../../../../types/ProfileTypes";
import style from "../../Profile.module.scss";
import classNames from "classnames";
import { createFieldWithInitVal } from "../../../../../common/helpers/createField";
import { isLink } from "../../../../../common/helpers/validators";
import useOnClickOutside from "../../../../../hooks/onClickOutside";

interface Props {
    contactsArray: ContactsArray;
    socialMediaEditMode: boolean;
    setSocialMediaEditMode: (isInEditMode: boolean) => void;
}

const Links: FC<Props> = ({
    contactsArray,
    socialMediaEditMode,
    setSocialMediaEditMode,
}) => {
    const editSocialMediaClassName = socialMediaEditMode
        ? style.additionalInfActive
        : style.additionalInf;

    const formRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside({
        callback: setSocialMediaEditMode,
        exceptions: ["social-media"],
        ref: formRef,
    });

    return (
        <div
            ref={formRef}
            className={classNames(editSocialMediaClassName, "links-form")}
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
    );
};

export default Links;

import React from "react";

const ACCOUNT_SETTINGS_LINK = "https://social-network.samuraijs.com/account";

export const ModalWindowBody = () => {
    return (
        <span className="text">
            Generate your API-KEY at
            <a href={ACCOUNT_SETTINGS_LINK} target="_blank">
                account security settings.
            </a>
        </span>
    );
};

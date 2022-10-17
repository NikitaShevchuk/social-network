import React from "react";
import SingleMessage from "../../components/MainContent/Messages/SingleMessage";
import SingleDialog from "../../features/DialogsList/SingleDialog";
import {createSelector} from "reselect";
import {DialogWithMessage, Message} from "../../types/MessagesTypes";
import {RootState} from "../redux-store";

const getMessages = (state: RootState) => state.messagesPage.messages
const getSenderPhoto = (state: RootState) => state.messagesPage.conversationHead.photo
const getSenderName = (state: RootState) => state.messagesPage.conversationHead.userName
export const getMyId = (state: RootState) => state.auth.userData.id
const getDialogs = (state: RootState) => state.messagesPage.dialogs
const getProfileImg = (state: RootState) => state.auth.profileImg

export const messagesReselect = createSelector(
    getMessages, getMyId, getProfileImg, getSenderPhoto,
    (messages, myId, profileImg, senderPhoto) => messages.map(
        (mes: Message) => (
            <SingleMessage
                {...mes} key={mes.id}
                myId={myId}
                profileImg={profileImg}
                senderPhoto={senderPhoto}
            />
        )
    )
)

export const dialogsReselect = createSelector(getDialogs, dialogs => {
    return dialogs.map(
        (dialog: DialogWithMessage) => <SingleDialog {...dialog} key={dialog.id} />
    )
})
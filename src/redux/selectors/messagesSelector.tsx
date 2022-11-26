import React from "react";
import SingleMessage from "../../components/MainContent/Messages/SingleMessage";
import SingleDialog from "../../features/DialogsList/SingleDialog";
import {createSelector} from "reselect";
import {DialogWithMessage, Message, MessagesRequestStatus} from "../../types/MessagesTypes";
import {RootState} from "../redux-store";

const getMessages = (state: RootState) => state.messagesPage.messages
const getSenderPhoto = (state: RootState) => state.dialogsPage.conversationHead.photo
export const getMyId = (state: RootState) => state.auth.userData.id
const getDialogs = (state: RootState) => state.dialogsPage.dialogs
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

export const getTotalMessagesCount = (state: RootState): number => {
    return state.messagesPage.totalMessagesCount
}

export const getMessagesRequestStatus = (state: RootState): MessagesRequestStatus => {
    return state.messagesPage.status
}


export const getMessagesPageNumber = (state: RootState): number => {
    return state.messagesPage.pageNumber
}
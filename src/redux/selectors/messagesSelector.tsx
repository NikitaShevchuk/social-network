import React from "react";
import SingleMessage from "../../components/MainContent/Messages/SingleMessage";
import SingleDialog from "../../components/MainContent/Messages/Dialogs/SingleDialog";
import {createSelector} from "reselect";
import {Idialog, Imessage} from "../../types/messagesTypes";
import {RootState} from "../redux-store";

const getMessages = (state: RootState) => state.messagesPage.messages
const getSenderPhoto = (state: RootState) => state.messagesPage.conversationHead.photo
const getSenderName = (state: RootState) => state.messagesPage.conversationHead.userName
export const getMyId = (state: RootState) => state.auth.userData.id
const getDialogs = (state: RootState) => state.messagesPage.dialogs
const getProfileImg = (state: RootState) => state.auth.profileImg

export let messagesReselect = createSelector(getMessages, getMyId, getProfileImg, getSenderPhoto, (messages, myId, profileImg, senderPhoto) => {
    return messages.map( (mes: Imessage) => <SingleMessage {...mes} myId={myId} profileImg={profileImg} senderPhoto={senderPhoto} key={mes.id} /> )
})

export let dialogsReselect = createSelector(getDialogs, dialogs => {
    return dialogs.map( (dialog: Idialog) => <SingleDialog {...dialog}  key={dialog.id} /> )
})
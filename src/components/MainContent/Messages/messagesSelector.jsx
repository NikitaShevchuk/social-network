import React from "react";
import SingleMessage from "./SingleMessage";
import SingleDialog from "./SingleDialog";
import {createSelector} from "reselect";

const getMessages = state => state.messagesPage.messages
const getSenderPhoto = state => state.messagesPage.conversationHead.photo
const getSenderName = state => state.messagesPage.conversationHead.userName
export const getMyId = state => state.auth.userData.id
const getDialogs = state => state.messagesPage.dialogs
const getProfileImg = state => state.auth.profileImg

export let messagesReselect = createSelector(getMessages, getMyId, getProfileImg, getSenderPhoto, (messages, myId, profileImg, senderPhoto) => {
    return messages.map( mes => <SingleMessage {...mes} myId={myId} profileImg={profileImg} senderPhoto={senderPhoto} key={mes.id} /> )
})

export let dialogsReselect = createSelector(getDialogs, dialogs => {
    return dialogs.map( dialog => <SingleDialog {...dialog}  key={dialog.id} /> )
})
import React from "react";
import SingleMessage from "./SingleMessage";
import SingleDialog from "./SingleDialog";

const getMessages = state => state.messagesPage.messages
const getMyId = state => state.auth.userData.id
const getDialogs = state => state.messagesPage.dialogs

export let messagesReselect = (state) => getMessages(state).map( mes => <SingleMessage {...mes} myId={getMyId(state)} key={mes.id} /> )

export let dialogsReselect = (state) => getDialogs(state).map( dialog => <SingleDialog {...dialog}  key={dialog.id} /> )
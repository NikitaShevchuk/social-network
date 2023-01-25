import React from 'react';
import { createSelector } from 'reselect';
import SingleMessage from '../../components/MainContent/Messages/SingleMessage';
import SingleDialog from '../../features/DialogsList/SingleDialog';
import { DialogWithMessage, Message, MessagesRequestStatus } from '../../types/MessagesTypes';
import { RootState } from '../redux-store';

const getMessages = (state: RootState) => state.messagesPage.messages;
const getSenderPhoto = (state: RootState) => state.dialogsPage.conversationHead.photo;
export const getMyId = (state: RootState) => state.auth.userData.id;
const getDialogs = (state: RootState) => state.dialogsPage.dialogs;
const getProfileImg = (state: RootState) => state.auth.profileImg;

export const messagesReselect = createSelector(
    getMessages,
    getMyId,
    getProfileImg,
    getSenderPhoto,
    (messages, myId, profileImg, senderPhoto) =>
        messages.map((singleMessage: Message) => (
            <SingleMessage
                {...singleMessage}
                key={singleMessage.id}
                myId={myId}
                profileImg={profileImg}
                senderPhoto={senderPhoto}
            />
        ))
);

export const dialogsReselect = createSelector(getDialogs, (dialogs) =>
    dialogs.map((dialog: DialogWithMessage) => <SingleDialog {...dialog} key={dialog.id} />)
);

export const getTotalMessagesCount = (state: RootState): number =>
    state.messagesPage.totalMessagesCount;

export const getMessagesRequestStatus = (state: RootState): MessagesRequestStatus =>
    state.messagesPage.status;

export const getMessagesPageNumber = (state: RootState): number => state.messagesPage.pageNumber;

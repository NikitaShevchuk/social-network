import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../redux/redux-store';
import Dialogs from './Dialogs/Dialogs';

import {
    fetchMessages,
    loadMessages,
    loadMoreMessages,
    sendNewMessage
} from '../../../redux/reducers/messages-reducer/middleware';
import Messages from './Messages';
import {
    getMessagesPageNumber,
    getMessagesRequestStatus,
    getTotalMessagesCount,
    messagesReselect
} from '../../../redux/selectors/messagesSelector';
import {
    setDialogUserId,
    setIsAllMessagesLoaded,
    setPageNumber
} from '../../../redux/reducers/messages-reducer/actions';

const MessagesContainer: FC<MessagesPropsType> = (props) => {
    const userId = Number(useParams().userId);

    useEffect(() => {
        if (userId) {
            props.setDialogUserId(userId);
            props.loadMessages();
        }
        const setFetchInterval = (): NodeJS.Timer | false => {
            if (userId) return setInterval(() => props.fetchMessages(), 1500);
            return false;
        };
        const fetchInterval = setFetchInterval();
        return () => {
            if (fetchInterval) clearInterval(fetchInterval);
        };
    }, [userId]);

    return (
        <div className="central-meta messages">
            <div className="messages">
                <div className="message-box">
                    <Dialogs />
                    <Messages {...props} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    messages: messagesReselect(state),
    totalMessagesCount: getTotalMessagesCount(state),
    pageNumber: getMessagesPageNumber(state),
    status: getMessagesRequestStatus(state)
});

const connector = connect(mapStateToProps, {
    sendNewMessage,
    loadMessages,
    fetchMessages,
    setIsAllMessagesLoaded,
    setPageNumber,
    loadMoreMessages,
    setDialogUserId
});

export default connector(MessagesContainer);

export type MessagesPropsType = ConnectedProps<typeof connector>;

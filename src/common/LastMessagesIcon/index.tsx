import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox';

const LastMessagesIcon = () => {
    return (
        <div className="naves-links__item inbox">
            <FontAwesomeIcon icon={faInbox} />
        </div>
    );
};

export default LastMessagesIcon;

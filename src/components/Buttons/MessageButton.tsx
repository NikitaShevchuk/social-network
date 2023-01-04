import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { getDialog } from '../../redux/reducers/dialogs-reducer/middleware';

interface Props extends MessageButtonConnectedProps {
    userId: number;
}

const MessageButton: FC<Props> = ({ userId, getDialog }) => {
    const handleClick = () => getDialog(userId);
    return (
        <NavLink
            replace
            to={`/messages/${userId}`}
            onClick={handleClick}
            className="add-butn whiteBg"
        >
            Message
        </NavLink>
    );
};

const mapStateToProps = () => ({});
const connector = connect(mapStateToProps, { getDialog });
export default connector(MessageButton);
type MessageButtonConnectedProps = ConnectedProps<typeof connector>;

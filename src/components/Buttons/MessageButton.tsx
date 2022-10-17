import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {getDialog} from "../../redux/reducers/messagesReducer/middleware";
import {RootState} from "../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";

interface Props extends MessageButtonConnectedProps {
    userId: number
}

const MessageButton: FC<Props> = ({userId, getDialog}) => {
    const handleClick = () => getDialog(userId)
    return (
        <NavLink
            replace to={`/messages/${userId}`}
            onClick={handleClick}
            className="add-butn whiteBg"
        >
            Message
        </NavLink>
    );
};

const mapStateToProps = (state: RootState) => ({})
const connector = connect(mapStateToProps, {getDialog})
export default connector(MessageButton);
type MessageButtonConnectedProps = ConnectedProps<typeof connector>
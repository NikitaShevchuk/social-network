import React, {FC} from "react";
import {sendNewMessage, setAllMessages, setDialogs} from "../../../redux/reducers/messagesReducer/middleware";
import Messages from "./Messages";
import {connect, ConnectedProps} from "react-redux";
import {messagesReselect} from "../../../redux/selectors/messagesSelector";
import {RootState} from "../../../redux/redux-store";

const MessagesContainer: FC<MessagesPropsType> = (props) => {
    return (
        <Messages {...props} />
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        messages: messagesReselect(state)
    }
}

const connector = connect(
    mapStateToProps,
    {sendNewMessage, setAllMessages, setDialogs}
)

export default connector(MessagesContainer);

export type MessagesPropsType = ConnectedProps<typeof connector>
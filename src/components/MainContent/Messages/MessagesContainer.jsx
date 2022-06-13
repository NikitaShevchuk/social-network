import React from "react";
import {filterDialogs, getDialog, sendNewMessage, setAllMessages, setDialogs} from "../../redux/messagesPageReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withRedirect from "../../HOC/withRedirect";
import {compose} from "redux";
import {dialogsReselect, messagesReselect} from "./messagesSelector";


const mapStateToProps = (state) => {
    return {
        messages: messagesReselect(state),
        dialogs: dialogsReselect(state),
        conversationHead: state.messagesPage.conversationHead
    }
}


export default compose(
    withRedirect,
    connect(mapStateToProps, {getDialog, sendNewMessage, setAllMessages, setDialogs, filterDialogs})
)(Messages);
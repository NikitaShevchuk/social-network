import React, {FC} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import userImg from "../../../common/assets/img/userIcon.jpg";
import {NavLink} from "react-router-dom";

const ConversationHead: FC<ConversationHeadProps> = ({conversationHead}) => {
    const headerImage = conversationHead.photo ? conversationHead.photo : userImg
    return (
        <NavLink
            replace
            to={`/profile/${conversationHead.id}`}
            className="conversation-head"
        >
            <figure>
                <img src={headerImage} alt=""/>
            </figure>
            <span>{conversationHead.userName}</span>
        </NavLink>
    );
};

const mapStateToProps = (state: RootState) => ({
    conversationHead: state.dialogsPage.conversationHead
})

const connector = connect(mapStateToProps, {})

export default connector(ConversationHead)
export type ConversationHeadProps = ConnectedProps<typeof connector>
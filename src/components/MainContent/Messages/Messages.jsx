import React, {useEffect, useRef} from "react";
import {Form, Field} from "react-final-form"
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader";
import send from '../../common/assets/img/send.svg'
import userImg from '../../common/assets/img/userIcon.jpg'

const Messages = (props) => {
    let userId = useParams().userId;
    let element = useRef(null);
    let scrollToBottom = () => element.current.scrollTop = element.current.scrollHeight
    const sendMessage = (formData) => {
        props.sendNewMessage(userId, formData)
    }
    const startDialog = () => {
        props.getDialog(23790)
    }
    useEffect(() => {
        if (userId) props.setAllMessages(userId)
        props.setDialogs(userId)
    }, [userId])
    useEffect(() => {
        if (element.current && props.messages[0]) scrollToBottom()
    }, [props.messages])
    return <div className="central-meta messages">
        <div className="messages">
            <div className="message-box">
                <ul className="peoples ps-container ps-theme-default ps-active-y">
                    {props.dialogs ? props.dialogs : <Preloader/>}
                </ul>
                <div className="peoples-mesg-box">
                    {userId ?
                        <div className='chatArea'>
                            <div className="conversation-head">
                                <figure><img src={props.conversationHead.photo ? props.conversationHead.photo : userImg} alt=""/></figure>
                                <span>{props.conversationHead.userName}<i>online</i></span>
                            </div>
                            <ul className="chatting-area ps-container ps-theme-default ps-active-y"
                                ref={element}>
                                {props.messages[0] ? props.messages : <Preloader/>}
                            </ul>
                            <div className="message-text-container">
                                <NewMessage sendMessage={sendMessage}/>
                                {/*<button onClick={startDialog}> get dialog</button>*/}
                            </div>
                        </div>
                        : <div className='noMessages'>Choose friend to start chat</div>}
                </div>
            </div>
        </div>
    </div>
}

const NewMessage = (props) => {
    const sendMessageOnEnter = (e, form) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            form.submit()
            form.reset()
        }
    }
    return <Form onSubmit={props.sendMessage} render={({handleSubmit, submitting, pristine, form}) => (
        <form onSubmit={handleSubmit}>
            <div className="messages-additional-icons"><i className="fa fa-picture-o"/></div>
            <div className="messages-additional-icons"><i className="fa fa-smile-o"/></div>
            <Field onKeyDown={e => {
                sendMessageOnEnter(e, form)
            }} name={'body'} component={'textarea'} placeholder='Text a message'/>
            <button disabled={submitting || pristine}><img src={send} alt=""/></button>
        </form>
    )}/>
}

export default Messages;
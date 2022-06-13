import React, {useEffect, useRef, useState} from "react";
import {Form, Field} from "react-final-form"
import {NavLink, useParams} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import send from '../../common/assets/img/send.svg'
import userImg from '../../common/assets/img/userIcon.jpg'
import UsersContainer from "../Users/UsersContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSquarePlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {required} from "../../common/validators";
import {isSearchFieldEmpty} from "../../common/FormControl";

const Messages = (props) => {

    //let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    // ws.addEventListener('message', (e) => {
    //     console.log(e)
    // })

    let userId = useParams().userId;
    let element = useRef(null);
    let scrollToBottom = () => element.current.scrollTop = element.current.scrollHeight
    const sendMessage = (formData) => {
        props.sendNewMessage(userId, formData)
    }
    useEffect(() => {
        if (userId) props.setAllMessages(userId)
        if (userId) setInterval( () => props.setAllMessages(userId), 5000 )
        props.setDialogs(userId)
    }, [userId])
    useEffect(() => {
        if (element.current && props.messages[0]) scrollToBottom()
    }, [props.messages])
    return <div className="central-meta messages">
        <div className="messages">
            <div className="message-box">
                <Dialogs {...props} userId={userId} />
                <div className="peoples-mesg-box">
                    {userId ?
                        <div className='chatArea opacity-animation'>
                            <NavLink replace to={`/profile/${props.conversationHead.id}`} className="conversation-head">
                                <figure><img src={props.conversationHead.photo ? props.conversationHead.photo : userImg}
                                             alt=""/></figure>
                                <span>{props.conversationHead.userName}</span>
                            </NavLink>
                            <ul className="chatting-area ps-container ps-theme-default ps-active-y"
                                ref={element}>
                                {props.messages[0] ? props.messages : <Preloader/>}
                            </ul>
                            <div className="message-text-container">
                                <NewMessage sendMessage={sendMessage}/>
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
            <Field onKeyDown={e => {
                sendMessageOnEnter(e, form)
            }} name={'body'} component={'textarea'} placeholder='Text a message'/>
            <button disabled={submitting || pristine}><img src={send} alt=""/></button>
        </form>
    )}/>
}

const Dialogs = props => {
    const dialogsSearch = formData => {
        props.filterDialogs(formData.searchBody)
    }
    let [searchMode, setSearchMode] = useState(false);
    return <ul className="peoples">
        <div className="sidebarHeader">
            {searchMode ?
                <><span className="text opacity-animation">Find people</span>
                    <FontAwesomeIcon className='opacity-animation' onClick={ () => setSearchMode(false)} icon={faXmark}/></>
                :
                <><span className="text opacity-animation">Messages</span>
                    <FontAwesomeIcon className='opacity-animation' onClick={ () => setSearchMode(true)} icon={faSquarePlus}/></>
            }
        </div>
        {searchMode ?
            <UsersContainer setSearchMode={setSearchMode} getDialog={props.getDialog}/>
            :
            <><div className="search-users pointer">
                    <FontAwesomeIcon icon={faSearch} />
                <Form
                    onSubmit={dialogsSearch}
                    render={({handleSubmit, submitting, pristine, form}) => (
                        <form onSubmit={handleSubmit}>
                            <Field name='searchBody' autoFocus validate={required} onKeyUp={(e) => {
                                isSearchFieldEmpty(e, form, props.setDialogs, props.userId)
                                form.submit()
                            }}
                                   component={'input'} placeholder='Find dialog by name' className="search-users__input"/>
                        </form>
                    )}
                />
                </div>
                {props.dialogs[0] ? props.dialogs : <Preloader/>}</>
        }
    </ul>
}

export default Messages;
import React from "react";
import s from './../Dialogs.module.css';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";

const MessageItem = (props) => {
    return (
        <div className={`${s.messageItem} ${props.add_class}`}>
            <img src={props.avatar} alt=""/>
            <p>{props.message}</p>
        </div>
    )
};

const Messages = (props) => {

    let messages =
        props.dialogsPage.messagesData.map(
            m => (m.senderMe === 1) ? (
                <MessageItem message={m.messege} avatar={m.avatar} add_class='reverse'/>
            ) : (
                <MessageItem message={m.messege} avatar={m.avatar}/>)
    );

    let newMessage = props.dialogsPage.newMessage;

    /*
    let newMessage = React.createRef();

    let addMessage = () => {
        let text = newMessage.current.value;
        alert(text);
    };
    */

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.dispatch(updateNewMessageBodyCreator(body));
    };

    let sendMessage = () => {
        props.dispatch(sendMessageCreator())
    };


    return (
        <div className={s.messages}>
            {messages}

            <textarea onChange={onNewMessageChange} value={newMessage} className={s.messageText} placeholder='Введите сообщение'/>
            <button onClick={sendMessage} className={s.messageButton}>Отправить</button>
        </div>
    )
};

export default Messages;
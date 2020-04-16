import React from "react";
import s from './../Dialogs.module.css';

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
        props.messagesData.map(
            m => m.senderMe ? (
                <MessageItem message={m.messege} avatar={m.avatar} add_class='reverse'/>
            ) : (
                <MessageItem message={m.messege} avatar={m.avatar}/>)
    );

    let newMessage = props.newMessage;

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    };

    let sendMessage = () => {
        props.sendMessage();
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
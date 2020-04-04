import React from "react";
import s from './../Dialogs.module.css';

const MessageItem = (props) => {
    return (
        <div>{props.message}</div>
    )
};

const Message = (props) => {

    let messages = props.messagesData.map(m => <MessageItem message={m.messege}/>)

    return (
        <div className={s.messages}>
            {messages}
        </div>
    )
};

export default Message;
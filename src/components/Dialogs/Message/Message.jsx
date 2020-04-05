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

const Message = (props) => {

    let messages =
        props.messagesData.map(
            m => (m.senderMe === 1) ? (
                <MessageItem message={m.messege} avatar={m.avatar} add_class='reverse'/>
            ) : (
                <MessageItem message={m.messege} avatar={m.avatar}/>)
        )

    return (
        <div className={s.messages}>
            {messages}
        </div>
    )
};

export default Message;
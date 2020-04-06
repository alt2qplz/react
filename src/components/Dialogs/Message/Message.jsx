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

    let newMessage = React.createRef();

    let addMessage = () => {
        let text = newMessage.current.value;
        alert(text);
    };

    return (
        <div className={s.messages}>
            {messages}

            <textarea ref={newMessage} className={s.messageText}></textarea>
            <button onClick={addMessage} className={s.messageButton}>Отправить</button>
        </div>
    )
};

export default Message;
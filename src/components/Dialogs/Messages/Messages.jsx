import React from "react";
import s from './../Dialogs.module.css';
import {Field, reduxForm} from 'redux-form';

let AddNewMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={`${s.newMessageForm} white-container`}>
            <Field component='input' name='newMessageBody' placeholder='Введите сообщение' component='textarea' type='text' className={s.messageText}/>
            <button className={s.messageButton}>Отправить</button>
        </form>
    )
};

AddNewMessage = reduxForm({
    form: 'newMessageBody'
})(AddNewMessage);

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
                <MessageItem message={m.message} avatar={m.avatar} add_class='reverse'/>
            ) : (
                <MessageItem message={m.message} avatar={m.avatar}/>)
        );


    let submit = values => {
        console.log(values.newMessageBody);
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div>
        <div className={`${s.messagesBody} white-container`}>
           {messages}
        </div>
            <AddNewMessage onSubmit={submit} />
        </div>
    )
};

export default Messages;
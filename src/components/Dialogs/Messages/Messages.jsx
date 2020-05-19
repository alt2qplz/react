import React, {useEffect, useState} from "react";
import s from './../Dialogs.module.css';
import {Field, reduxForm, reset} from 'redux-form';
import {getMessages, sendMessageToUser} from "../../../redux/reducers/dialogs-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {getProfile} from "../../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";


let AddNewMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={`${s.newMessageForm} white-container`}>
            <Field name='message' placeholder='Введите сообщение' component='textarea' type='text'
                   className={s.messageText}/>
            <button className={s.messageButton}>Отправить</button>
        </form>
    )
};

AddNewMessage = reduxForm({
    form: 'sendMessage'
})(AddNewMessage);

const MessageItem = (props) => {
    return (
        <div className={`${s.messageItem} ${props.add_class}`}>
            <p>{props.message}</p>
        </div>
    )
};

const Messages = (props) => {

    let dialogueId = Number(props.match.params.userId);

    let messages =
        props.messagesData.map(
            m => m.senderId === props.myId
                ? <MessageItem key={m.id} message={m.body} name={m.senderName} add_class={s.myMessageItem}/>
                : <MessageItem key={m.id} message={m.body} name={m.senderName} add_class={s.friendMessageItem}/>
        );

    let submit = formData => {
        props.sendMessageToUser(dialogueId, formData.message);
        props.reset('sendMessage')
    };

    if (!dialogueId) {
        return <div></div>
    }

    return (
        <div>
            <div className={`${s.messagesBody} white-container`}>
                {messages}
            </div>
            <AddNewMessage onSubmit={submit}/>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        myId: state.auth.id
    }
};

export default compose(
    connect(mapStateToProps, {sendMessageToUser, reset, getProfile, getMessages}),
    withRouter
)(Messages);
import React, {useEffect, useState} from "react";
import s from './../Dialogs.module.css';
import {Field, reduxForm, reset} from 'redux-form';
import {getMessages, sendMessageToUser} from "../../../redux/reducers/dialogs-reducer";
import Preloader from "../../common/Preloader/Preloader";
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
            <img src={props.avatar} alt=""/>
            {/*<p>{props.name}</p>*/}

            <p>{props.message}</p>
        </div>
    )
};

const Messages = (props) => {

    let [dialogueId, setDialogueId] = useState(Number(props.match.params.userId));

    useEffect(() => {
        setDialogueId(Number(props.match.params.userId));
    }, [props.match.params.userId]);

    let messages =
        props.messagesData.map(
            m => m.senderId === props.myId
                ? <MessageItem key={m.id} message={m.body} name={m.senderName} avatar={props.myProfile.photos.small} add_class='reverse'/>
                : <MessageItem key={m.id} message={m.body} name={m.senderName} avatar={props.avatar} add_class=''/>
        );

    let submit = formData => {
        props.sendMessageToUser(dialogueId, formData.message);
        props.reset('sendMessage')
    };

    if (!dialogueId) {
        return <div></div>
    }

    if (props.myProfile === null) {
        props.getProfile(props.myId);
        return <Preloader/>
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
        myId: state.auth.id,
        avatar: state.dialogsPage.currentProfile.photos.small,
        myProfile: state.profilePage.profile,
    }
};

export default compose(
    connect(mapStateToProps, {sendMessageToUser, reset, getProfile}),
    withRouter
)(Messages);
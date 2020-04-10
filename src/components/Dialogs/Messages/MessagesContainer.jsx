import React from "react";
import Messages from "./Messages";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";

const MessagesContainer = (props) => {

    let state = props.store.getState();

    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    let sendMessage = () => {
        props.store.dispatch(sendMessageCreator())
    };


    return <Messages onNewMessageChange={onNewMessageChange}
                     sendMessage={sendMessage}
                     messagesData={state.dialogsPage.messagesData}
                     newMessage={state.dialogsPage.newMessage}
            />
};

export default MessagesContainer;
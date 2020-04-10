import React from "react";
import Messages from "./Messages";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";

/*const MessagesContainer = (props) => {

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
};*/

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        newMessage: state.dialogsPage.newMessage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;
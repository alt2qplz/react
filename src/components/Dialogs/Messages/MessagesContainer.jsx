import React from "react";
import Messages from "./Messages";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";

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
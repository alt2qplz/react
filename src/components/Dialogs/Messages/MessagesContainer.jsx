import React from "react";
import Messages from "./Messages";
import {sendMessage, updateNewMessageBody} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        newMessage: state.dialogsPage.newMessage
    }
};

export default connect(mapStateToProps, {sendMessage, updateNewMessageBody})(Messages);
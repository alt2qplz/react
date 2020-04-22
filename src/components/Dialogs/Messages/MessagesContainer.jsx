import React from "react";
import Messages from "./Messages";
import {sendMessage} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData
    }
};

export default connect(mapStateToProps, {sendMessage})(Messages);
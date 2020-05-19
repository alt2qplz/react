import React, {useEffect, useState} from "react";
import s from './Dialogs.module.css';
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Messages from "./Messages/Messages";
import ChatRoom from "./ChatRoom/ChatRoom";
import Preloader from "../common/Preloader/Preloader";
import {getAllDialogs, getMessages} from "../../redux/reducers/dialogs-reducer";
import {withRouter} from "react-router-dom";

const Dialogs = (props) => {

    let [dialogueId, setDialogueId] = useState(Number(props.match.params.userId));

    useEffect(() => {
        props.getAllDialogs();
        props.getMessages(dialogueId)
    }, []);

    return (
        <div className={`${s.dialogs}`}>
            <ChatRoom />
            <Messages />
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.dialogsPage.isFetching
    }
};

export default compose(
    connect(mapStateToProps, {getAllDialogs, getMessages}),
    withAuthRedirect,
    withRouter
)(Dialogs);
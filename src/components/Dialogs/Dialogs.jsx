import React from "react";
import s from './Dialogs.module.css';
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Messages from "./Messages/Messages";
import ChatRoom from "./ChatRoom/ChatRoom";
import Preloader from "../common/Preloader/Preloader";

const Dialogs = (props) => {

    return (
        <div className={`${s.dialogs}`}>
            <ChatRoom />
            {props.isFetching
            ? <Preloader />
            : <Messages />}
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.dialogsPage.isFetching
    }
};

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Dialogs);
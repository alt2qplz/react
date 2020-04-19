import React from "react";
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogueContainer from "./Dialogue/DialogueContainer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {

    if(!props.isLogin) return <Redirect to='/login' />;

    return (
        <div className={s.dialogs}>
            <DialogueContainer />
            <MessagesContainer />
        </div>
    )
};

let mapStateToProps = (state) => {
    return{
        isLogin: state.auth.isLogin
    }
};

export default connect(mapStateToProps, {})(Dialogs);
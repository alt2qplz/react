import React from "react";
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogueContainer from "./Dialogue/DialogueContainer";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <DialogueContainer />
            <MessagesContainer />
        </div>
    )
};

let mapStateToProps = (state) => {
    return {}
};

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Dialogs);
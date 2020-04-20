import React from "react";
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogueContainer from "./Dialogue/DialogueContainer";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

const Dialogs = (props) => {



    return (
        <div className={s.dialogs}>
            <DialogueContainer />
            <MessagesContainer />
        </div>
    )
};

let mapStateToProps = (state) => {
    return {

    }
};

export default withAuthRedirect(connect(mapStateToProps, {})(Dialogs));
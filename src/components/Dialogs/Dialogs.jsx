import React from "react";
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogueContainer from "./Dialogue/DialogueContainer";



const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <DialogueContainer />
            <MessagesContainer />
        </div>
    )
};

export default Dialogs;
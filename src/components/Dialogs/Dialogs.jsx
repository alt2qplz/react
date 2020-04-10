import React from "react";
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogueContainer from "./Dialogue/DialogueContainer";



const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <DialogueContainer store={props.store}/>
            <MessagesContainer store={props.store}/>
        </div>
    )
};

export default Dialogs;
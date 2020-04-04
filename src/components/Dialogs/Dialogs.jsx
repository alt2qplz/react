import React from "react";
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import Dialogue from "./Dialogue/Dialogue";



const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <Dialogue dialogsData={props.state.dialogsData}/>
            <Message messagesData={props.state.messagesData}/>
        </div>
    )
};

export default Dialogs;
import React from "react";
import s from './Dialogs.module.css';
import Messages from "./Messages/Messages";
import Dialogue from "./Dialogue/Dialogue";



const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <Dialogue dialogsData={props.dialogsPage.dialogsData}/>
            <Messages dialogsPage={props.dialogsPage} dispatch={props.dispatch}/>
        </div>
    )
};

export default Dialogs;
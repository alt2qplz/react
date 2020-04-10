import React from "react";
import s from './../Dialogs.module.css';
import Dialogue from "./Dialogue";

const DialogueContainer = (props) => {
    let state = props.store.getState();

    return <Dialogue dialogsData={state.dialogsPage.dialogsData}/>
};

export default DialogueContainer;
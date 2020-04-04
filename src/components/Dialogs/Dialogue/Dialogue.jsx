import React from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";



const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (
        <NavLink to={path}>{props.name}</NavLink>
    )
};

const Dialogue = (props) => {



    let dialogs = props.dialogsData.map( d => <DialogItem name={d.name} id={d.id} />);

    return (
            <div className={s.names}>
                { dialogs }
            </div>
    )
};

export default Dialogue;
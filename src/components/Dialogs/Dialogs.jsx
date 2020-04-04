import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (
        <NavLink to={path}>{props.name}</NavLink>
    )
};

const Message = (props) => {
    return (
        <div>{props.message}</div>
    )
};

const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Alexander'},
        {id: 2, name: 'Masha'},
        {id: 3, name: 'Alexander'},
        {id: 4, name: 'Alexander'},
        {id: 5, name: 'Alexander'}
    ];

    let messagesData = [
        {id: 1, messege: 'Привет'},
        {id: 2, messege: 'Привет2'},
        {id: 3, messege: 'Привет3'},
        {id: 4, messege: 'Привет4'}
    ]
    return (
        <div className={s.dialogs}>
            <div className={s.names}>
                <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
            </div>
            <div className={s.messages}>
                <Message message={messagesData[0].messege}/>
                <Message message={messagesData[1].messege}/>
            </div>
        </div>
    )
};

export default Dialogs;
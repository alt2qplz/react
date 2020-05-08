import React from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {

  let path = '/dialogs/' + props.id;

  return (
    <div className={s.dialogItem}>
      <NavLink to={path}><img src={props.avatar} alt=""/>{props.name}</NavLink>
    </div>
  )
};

const Dialogue = (props) => {

  let dialogs = props.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>);

  return (
    <div className={`${s.names} white-container`}>
      {dialogs}
    </div>
  )
};

export default Dialogue;
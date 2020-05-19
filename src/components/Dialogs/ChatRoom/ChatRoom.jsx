import React, {useEffect, useState} from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getMessages} from "../../../redux/reducers/dialogs-reducer";

const ChatItem = (props) => {

    let path = '/dialogs/' + props.id;

    let avatar = props.avatar;

    if (avatar === null) {
        avatar = "https://www.w3schools.com/howto/img_avatar.png"
    }

    const getMessages = () => {
        props.getMessages(props.id);
    };

    return <NavLink className={s.dialogItem} onClick={getMessages} to={path} activeClassName={s.activeLink}>
        <img src={avatar} alt=""/><p>{props.name}</p>
    </NavLink>
};

const ChatRoom = (props) => {

    let [dialogsData, setDialogsData] = useState(props.dialogsData);

    useEffect( () => {
        setDialogsData(props.dialogsData)
    }, [props.dialogsData]);

    let dialogs = dialogsData.map(d => <ChatItem key={d.id} name={d.userName} id={d.id} avatar={d.photos.small}
                                                         getMessages={props.getMessages}/>);

    return (
        <div className={`${s.names} white-container`}>
            {dialogs}
        </div>

    )
};

const mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData
    }
};

export default connect(mapStateToProps, {getMessages})(ChatRoom);
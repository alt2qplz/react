import React from "react";
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={require('../../../../img/polar_bear.jpg')} alt=""/>
            <div><p>Сообщение: {props.message}</p></div>
            <div><p>LIKES: {props.likes}</p></div>
        </div>
    )
};

export default Post;

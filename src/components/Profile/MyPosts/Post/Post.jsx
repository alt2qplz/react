import React from "react";
import s from './Post.module.css'
import like from '../../../../img/like.svg'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={require('../../../../img/polar_bear.jpg')} alt="" className={s.avatar}/>
            <div className={s.message_likes}>
                <p className={s.message}>{props.message}</p>
                <div className={s.likes}>
                    <img src={like} alt=""/>
                    <p>{props.likes}</p>
                </div>
            </div>
        </div>
    )
};

export default Post;

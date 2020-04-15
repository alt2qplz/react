import React from "react";
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={require('../../../../img/polar_bear.jpg')} alt="" className={s.avatar}/>
            <div className={s.message_likes}>
                <p className={s.message}>{props.message}</p>
                <div className={s.likes}>
                    <img src="https://daddy-tales.ru/wp-content/uploads/2019/02/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B5-%D0%A1%D0%B5%D1%80%D0%B4%D0%B5%D1%87%D0%BA%D0%BE-%D0%9A%D0%BE%D0%BD%D1%82%D1%83%D1%80-%D0%94%D0%BB%D1%8F-%D0%92%D1%8B%D1%80%D0%B5%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F.jpeg" alt=""/>
                    <p>{props.likes}</p>
                </div>
            </div>
        </div>
    )
};

export default Post;

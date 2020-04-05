import React from "react";
import s from './MyFriends.module.css';

const MyFriends = (props) => {
    return (
        <div className={s.sideFriends}>
            <h3>
                Мои друзья
            </h3>
            <div className={s.Friends}>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""/>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""/>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""/>
            </div>
        </div>
    )
};



export default MyFriends;
import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={s.content}>
            <img className={s.profile_img} src={require('../../img/ykk.png')}/>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
};

export default Profile;

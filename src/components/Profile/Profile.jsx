import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import Information from "./Information/Information";

const Profile = () => {
    return (
        <div>
            <Information/>
            <MyPosts/>
        </div>
    )
};

export default Profile;

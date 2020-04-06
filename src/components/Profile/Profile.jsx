import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import Information from "./Information/Information";

const Profile = (props) => {
    return (
        <div>
            <Information/>
            <MyPosts postsData={props.profilePage.postsData} newPostText={props.profilePage.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
        </div>
    )
};

export default Profile;

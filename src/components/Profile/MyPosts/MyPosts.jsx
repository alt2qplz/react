import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            <div className={s.newpost}>
                <textarea name="" placeholder='Написать новый пост...'/>
                <button>Отправить</button>
            </div>
            <div>
                <Post message='Привет' likes='10'/>
                <Post message='Yo' likes='15'/>
            </div>
        </div>
    )
};

export default MyPosts;

import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            <h2>My posts</h2>
            <div>
                New post
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button>add post</button>
            </div>
            <div>
                <Post message='Привет' likes='10'/>
                <Post message='Yo' likes='15'/>
            </div>
        </div>
    )
};

export default MyPosts;

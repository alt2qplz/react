import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {

    let postData = [
        {id: 1, message:'Привет', likes: 10},
        {id: 2, message:'Yo', likes: 12}
    ]
    return (
        <div>
            <div className={s.newpost}>
                <textarea name="" placeholder='Написать новый пост...'/>
                <button>Отправить</button>
            </div>
            <div>
                <Post message={postData[0].message} likes={postData[0].likes}/>
                <Post message={postData[1].message} likes={postData[1].likes}/>
            </div>
        </div>
    )
};

export default MyPosts;

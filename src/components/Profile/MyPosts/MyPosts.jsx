import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsElements =
        props.postsData.map( p => <Post message={p.message} likes={p.likes}/>);

    return (
        <div>
            <div className={s.newpost}>
                <textarea name="" placeholder='Написать новый пост...'/>
                <button>Отправить</button>
            </div>
            <div>
                { postsElements }
            </div>
        </div>
    )
};

export default MyPosts;

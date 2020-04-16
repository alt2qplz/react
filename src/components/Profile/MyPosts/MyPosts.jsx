import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsElements =
        props.postsData.map( p => <Post message={p.message} likes={p.likes}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPost(text)
    };

    return (
        <div>
            <div className={s.newpost}>
                <textarea ref={newPostElement} onChange={ onPostChange } value={props.newPostText} placeholder='Просто начни писать текст здесь...'/>
                <button onClick={ addPost }>Отправить</button>
            </div>
            <div className={s.myPosts}>
                { postsElements }
            </div>
        </div>
    )
};

export default MyPosts;

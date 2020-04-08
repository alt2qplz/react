import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/state";



const MyPosts = (props) => {

    let postsElements =
        props.postsData.map( p => <Post message={p.message} likes={p.likes}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator())
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action)
    };

    return (
        <div>
            <div className={s.newpost}>
                <textarea ref={newPostElement} onChange={ onPostChange } value={props.newPostText}/>
                <button onClick={ addPost }>Отправить</button>
            </div>
            <div>
                { postsElements }
            </div>
        </div>
    )
};

export default MyPosts;

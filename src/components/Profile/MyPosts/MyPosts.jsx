import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators";

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.newpost}>
                <Field name='newPostText' type='text' component='textarea'
                       placeholder='Просто начни писать текст здесь...'
                       validate={[required]}/>
                <button>Отправить</button>
            </div>
        </form>
    )
};

AddNewPostForm = reduxForm({form: 'AddNewPostForm'})(AddNewPostForm);


const MyPosts = (props) => {

    let postsElements =
        props.postsData.map(p => <Post key={p.id} message={p.message} likes={p.likes} avatar={props.avatar}/>);

    let addPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div>
            <AddNewPostForm onSubmit={addPost}/>
            <div className={s.myPosts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;

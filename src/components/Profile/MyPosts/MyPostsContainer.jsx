import React from "react";
import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText : state.profilePage.newPostText
    }
};

export default connect(mapStateToProps,{
    addPost,
})(MyPosts);

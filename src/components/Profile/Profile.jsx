import React from "react";
import Information from "./Information/Information";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <Information/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;

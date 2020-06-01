import React from "react";
import ProfileInformation from "./Information/ProfileInformation";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {

    if (!props.profile || props.isFetching) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInformation profile={props.profile}
                                status={props.status}
                                updateStatus={props.updateStatus}
                                isOwner={props.isOwner}
                                updatePhoto={props.updatePhoto}
                                isFetching={props.isFetching}
                                followingInProgress={props.followingInProgress}
                                users={props.users}
                                follow={props.follow}
                                unfollow={props.unfollow}
                                userFollowStatus={props.userFollowStatus}
                                setUserFollowStatus={props.setUserFollowStatus}
                                checkFollow={props.checkFollow}
            />
            {props.isOwner &&
            <MyPostsContainer/>
            }
        </div>
    )
};

export default Profile;

import React from "react";
import Information from "./Information/Information";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div>
      <Information profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatus}
                   isOwner={props.isOwner}
                   updatePhoto={props.updatePhoto}
                   isFetching={props.isFetching}
      />
      {props.isOwner &&
      <MyPostsContainer/>
      }
    </div>
  )
};

export default Profile;

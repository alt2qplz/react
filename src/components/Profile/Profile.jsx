import React from "react";
import Information from "./Information/Information";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {

  if (!props.profile || props.isFetching) {
    return <Preloader/>
  }

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
      <MyPostsContainer />
      }
    </div>
  )
};

export default Profile;

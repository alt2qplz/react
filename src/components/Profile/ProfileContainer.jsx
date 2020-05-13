import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
  checkFollow,
  getProfile,
  getStatus,
  setUserFollowStatus,
  updatePhoto,
  updateStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getFollowingInProgress, getUsersSelector} from "../../redux/users-selector";
import {follow, unfollow} from "../../redux/users-reducer";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.refreshProfile(userId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      let userId = this.props.match.params.userId;
      this.refreshProfile(userId);
    }



    /*if (prevProps.userFollowStatus !== this.props.userFollowStatus && prevProps.userFollowStatus !== null) {
      debugger
      const userId = this.props.profile.userId;
      this.refreshProfile(userId)
    }*/
  }

  refreshProfile(userId) {
    this.props.getProfile(userId);
    this.props.checkFollow(userId);
    this.props.getStatus(userId);
  }

  render = () => {
    return <Profile {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    isOwner={!this.props.match.params.userId || this.props.match.params.userId === String(this.props.userId)}
                    updatePhoto={this.props.updatePhoto}
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    userFollowStatus={this.props.userFollowStatus}
                    setUserFollowStatus={this.props.setUserFollowStatus}
                    checkFollow={this.props.checkFollow}
    />
  }
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.profileStatus,
  userId: state.auth.id,
  isFetching: state.profilePage.isFetching,
  userFollowStatus: state.profilePage.userFollowStatus,
  followingInProgress: getFollowingInProgress(state),
  users: getUsersSelector(state)
});

export default compose(
  connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, follow, unfollow, checkFollow, setUserFollowStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

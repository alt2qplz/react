import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile(userId) {
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {

                this.props.history.push('/login')
            }
        }
        this.refreshProfile(userId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            let userId = this.props.match.params.userId;
            this.refreshProfile(userId)
        }
    }

    render = () => {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.match.params.userId || this.props.match.params.userId === String(this.props.userId)}
                        updatePhoto={this.props.updatePhoto}
                        isFetching={this.props.isFetching}
        />
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.profileStatus,
    userId: state.auth.id,
    isFetching: state.profilePage.isFetching
});

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

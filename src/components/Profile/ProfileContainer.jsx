import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) { userId = 7259 };
        this.props.getProfile(userId);
        this.props.getStatus(userId)
    }

    render = () => {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}/>
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.profileStatus
});

export default compose(
    connect(mapStateToProps, {getProfile, getStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)

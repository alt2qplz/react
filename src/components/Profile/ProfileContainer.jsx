import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) { userId = 7259 };
        this.props.getProfile(userId);
    }

    render = () => {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

export default connect(mapStateToProps, {getProfile})(withRouter(ProfileContainer));

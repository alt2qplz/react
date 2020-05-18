import React from "react";
import {
    follow,
    setCurrentPage,
    getUsers, unfollow
} from "../../redux/reducers/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/selectors/users-selector";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    };

    render = () => {
        return <Users {...this.props} onPageChanged={this.onPageChanged}/>
    }

};

const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, getUsers})(UsersContainer);

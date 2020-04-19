import React from "react";
import {
    follow,
    // isFetchingToggle,
    // isFollowingProgress,
    // setTotalUsersCount,
    setCurrentPage,
    setUsers,
    getUsers, unfollow
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    };

    render = () => {
        return <Users {...this.props} onPageChanged={this.onPageChanged} />
    }

};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};

export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, setUsers, getUsers})(UsersContainer);

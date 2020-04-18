import React from "react";
import {
    follow,
    isFetchingToggle,
    isFollowingProgress,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unsubscribe
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.isFetchingToggle(true);
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.isFetchingToggle(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.isFetchingToggle(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.isFetchingToggle(false);
                this.props.setUsers(data.items)
            });
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
    {follow, isFetchingToggle, setCurrentPage, setTotalUsersCount, setUsers, unsubscribe, isFollowingProgress})(UsersContainer);

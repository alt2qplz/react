import React from "react";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unsubscribeAC} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unsubscribe: (userId) => {
            dispatch(unsubscribeAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        }
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
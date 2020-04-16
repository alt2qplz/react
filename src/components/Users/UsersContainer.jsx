import React from "react";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unsubscribeAC} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import * as axios from "axios";

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    };

    render = () => {

        return <Users pageSize={this.props.pageSize}
                      pageCount={this.props.pageCount}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      unsubscribe={this.props.unsubscribe}
                      follow={this.props.follow}
                      currentPage={this.props.currentPage}

        />
    }

};

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

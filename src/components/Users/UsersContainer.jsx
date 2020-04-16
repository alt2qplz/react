import React from "react";
import {
    followAC,
    isFetchingToggleAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unsubscribeAC
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import * as axios from "axios";
import Preloader from "../Common/Preloader/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.isFetchingToggle(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                debugger
                this.props.isFetchingToggle(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.isFetchingToggle(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.isFetchingToggle(false);
                this.props.setUsers(response.data.items)
            });
    };

    render = () => {
        return <>
            {
                this.props.isFetching ?
                <Preloader />
                :
                <Users pageSize={this.props.pageSize}
                      pageCount={this.props.pageCount}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      unsubscribe={this.props.unsubscribe}
                      follow={this.props.follow}
                      currentPage={this.props.currentPage}/>
            }
        </>
    }

};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
        },
        isFetchingToggle: (isFetching) => {
            dispatch(isFetchingToggleAC(isFetching))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

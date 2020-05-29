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
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/store/redux-store";
import {compose} from "redux";

type PropsType = {
    currentPage: number
    pageSize: number
    pageNumber: number
    setCurrentPage: (pageNumber: number) => void
    getUsers: (pageNumber: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    isAuth: boolean
    followingInProgress: Array<number>
}

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    };

    render = () => {
        return <Users onPageChanged={this.onPageChanged}
                      totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      isFetching={this.props.isFetching}
                      users={this.props.users}
                      isAuth={this.props.isAuth}
                      followingInProgress={this.props.followingInProgress}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />
    }

};

const mapStateToProps = (state: AppStateType) => {
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

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers})
    )(UsersContainer);

import React from "react";
import {
    follow,
    isFetchingToggle,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unsubscribe
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
        return <Users {...this.props}
                      props={this.props}
                      onPageChanged={this.onPageChanged}
            />
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

export default connect(mapStateToProps,
    {follow, isFetchingToggle, setCurrentPage, setTotalUsersCount, setUsers, unsubscribe})(UsersContainer);

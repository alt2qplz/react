import React from "react";
import {
    follow,
    setCurrentPage,
    setUsers,
    getFriends, unfollow
} from "../../redux/reducers/users-reducer";
import {connect} from "react-redux";
import Friends from "./Friends";
import {
    getCurrentPage,
    getFollowingInProgress, getFriendsSelector,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
} from "../../redux/selectors/users-selector";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

class FriendsContainer extends React.Component {
    componentDidMount() {
        this.props.getFriends(10)
    }

    render = () => {
        return <Friends {...this.props}/>
    }

};

const mapStateToProps = (state) => {
    return {
        friends: getFriendsSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect(mapStateToProps,
        {follow, unfollow, setCurrentPage, getFriends}),
    withAuthRedirect
)(FriendsContainer);

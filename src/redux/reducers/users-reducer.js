import {usersAPI} from "../../api/api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_FRIENDS = 'users/SET_FRIENDS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING_TOGGLE = 'users/IS_FETCHING_TOGGLE';
const IS_FOLLOWING_PROGRESS = 'users/IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    friends: [],
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                }),
                friends: state.friends.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                }),
                friends: state.friends.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        }

        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }

        case SET_FRIENDS: {
            return {
                ...state,
                friends: [...action.friends]
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }

        case IS_FETCHING_TOGGLE: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case IS_FOLLOWING_PROGRESS: {

            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }


};

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setFriends = (friends) => ({type: SET_FRIENDS, friends});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const isFetchingToggle = (isFetching) => ({type: IS_FETCHING_TOGGLE, isFetching});
export const isFollowingProgress = (isFetching, userId) => ({type: IS_FOLLOWING_PROGRESS, isFetching, userId});

export const getUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(isFetchingToggle(true));
    const response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(isFetchingToggle(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
};

export const getFriends = (maxFriends) => async dispatch => {
    dispatch(isFetchingToggle(true));
    let friends = [];
    let currentPage = 1;
    while (friends.length < maxFriends && currentPage < 8) {
        let response = await usersAPI.getUsers(currentPage, 100);
        Array.prototype.push.apply(friends, response.data.items.filter(u => u.followed === true));
        currentPage += 1
    }
    dispatch(setFriends(friends));
    dispatch(isFetchingToggle(false));
    dispatch(setTotalUsersCount(friends));
};

export const follow = userId => async dispatch => {
    dispatch(isFollowingProgress(true, userId));
    const response = await usersAPI.follow(userId);
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(isFollowingProgress(false, userId))
};


export const unfollow = userId => async dispatch => {
    dispatch(isFollowingProgress(true, userId));
    const response = await usersAPI.unfollow(userId);
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(isFollowingProgress(false, userId))
};

export default usersReducer;
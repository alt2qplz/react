import {usersAPI} from "../../api/api";
import {UserType} from "../../types/types";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_FRIENDS = 'users/SET_FRIENDS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING_TOGGLE = 'users/IS_FETCHING_TOGGLE';
const IS_FOLLOWING_PROGRESS = 'users/IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    friends: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

type SetFriendsActionType = {
    type: typeof SET_FRIENDS
    friends: Array<UserType>
}
export const setFriends = (friends: Array<UserType>): SetFriendsActionType => ({type: SET_FRIENDS, friends});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

type IsFetchingToggleActionType = {
    type: typeof IS_FETCHING_TOGGLE
    isFetching: boolean
}
export const isFetchingToggle = (isFetching: boolean): IsFetchingToggleActionType => ({type: IS_FETCHING_TOGGLE, isFetching});

type IsFollowingProgress = {
    type: typeof IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const isFollowingProgress = (isFetching: boolean, userId: number): IsFollowingProgress => ({type: IS_FOLLOWING_PROGRESS, isFetching, userId});

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(isFetchingToggle(true));
    const response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(isFetchingToggle(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
};

export const getFriends = (maxFriends: number) => async (dispatch: any) => {
    dispatch(isFetchingToggle(true));
    let friends: Array<UserType> = [];
    let currentPage = 1;
    while (friends.length < maxFriends && currentPage < 8) {
        let response = await usersAPI.getUsers(currentPage, 100);
        Array.prototype.push.apply(friends, response.data.items.filter((u: UserType) => u.followed === true));
        currentPage += 1
    }
    dispatch(setFriends(friends));
    dispatch(isFetchingToggle(false));
    //dispatch(setTotalUsersCount(friends.length)); В данном случае она кажется ничего не меняет
};

export const follow = (userId: number) => async (dispatch: any) => {
    dispatch(isFollowingProgress(true, userId));
    const response = await usersAPI.follow(userId);
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(isFollowingProgress(false, userId))
};


export const unfollow = (userId: number) => async (dispatch: any) => {
    dispatch(isFollowingProgress(true, userId));
    const response = await usersAPI.unfollow(userId);
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(isFollowingProgress(false, userId))
};

export default usersReducer;
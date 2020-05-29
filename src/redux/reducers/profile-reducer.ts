import {profileAPI, usersAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsDataType, ProfileType} from "../../types/types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = 'profile/SET_USER_PROFILE_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PHOTO_SUCCESS = 'profile/SET_USER_PHOTO_SUCCESS';
const IS_FETCHING = 'profile/IS_FETCHING';
const SET_USER_FOLLOW_STATUS = 'profile/SET_USER_FOLLOW_STATUS';

let initialState = {
    postsData: [
        {
            id: 1,
            message: 'Искусство бесполезно, потому что его цель – лишь создавать настроение. В его задачу не входит ни ' +
                'поучать, ни как-либо влиять на поступки. Оно великолепно в своей стерильности, и его стерильность ' +
                'неотделима от доставляемого им удовольствия. Если созерцание произведения искусства побуждает к ' +
                'какой-либо деятельности, это значит, что либо произведение весьма посредственно, либо созерцающий ' +
                'не сумел оценить его во всей художественной полноте.',
            likes: 13
        }
    ] as Array<PostsDataType>,
    newPostText: '',
    profile: null as ProfileType | null,
    profileStatus: '',
    isFetching: false,
    userFollowStatus: null as boolean | null
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData, {id: 2, likes: 0, message: action.newPostText}],
                newPostText: ''
            }

        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: [...state.postsData.filter(e => e.id !== action.postId)]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: {...action.profile}
            }
        }

        case SET_USER_PROFILE_STATUS: {
            return {
                ...state,
                profileStatus: action.status
            }
        }

        case SET_USER_FOLLOW_STATUS: {
            return {
                ...state,
                userFollowStatus: action.userFollowStatus
            }
        }

        case SET_USER_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default:
            return state;
    }

};

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserProfileStatusActionType = {
    type: typeof SET_USER_PROFILE_STATUS,
    status: string
}
export const setUserProfileStatus = (status: string): SetUserProfileStatusActionType => ({type: SET_USER_PROFILE_STATUS, status});

type SetUserFollowStatusActionType = {
    type: typeof SET_USER_FOLLOW_STATUS
    userFollowStatus: boolean
}
export const setUserFollowStatus = (userFollowStatus: boolean): SetUserFollowStatusActionType => ({type: SET_USER_FOLLOW_STATUS, userFollowStatus});

type SetUserPhotoSuccessActionType = {
    type: typeof SET_USER_PHOTO_SUCCESS
    photos: PhotosType
}
export const setUserPhotoSuccess = (photos: PhotosType): SetUserPhotoSuccessActionType => ({type: SET_USER_PHOTO_SUCCESS, photos});

type IsFetchingType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
export const isFetchingToggle = (isFetching: boolean): IsFetchingType => ({type: IS_FETCHING, isFetching});

export const getProfile = (userId: number) => async (dispatch: any) => {
    dispatch(isFetchingToggle(true));
    const response = await profileAPI.getProfileInfo(userId);
    dispatch(setUserProfile(response.data));
    //dispatch(checkFollow(response.data.userId));
    dispatch(isFetchingToggle(false));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfileStatus(userId);
    dispatch(setUserProfileStatus(response.data))
};

export const checkFollow = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.checkFollow(userId);
    dispatch(setUserFollowStatus(response.data))
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateProfileStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
};

export const updatePhoto = (photoFile: any) => async (dispatch: any) => {
    const response = await profileAPI.updateProfilePhoto(photoFile);
    if (response.data.resultCode === 0) {
        dispatch(setUserPhotoSuccess(response.data.data.photos))
    }
};

export const updateProfile = (profile: ProfileType) => async (dispatch: any) => {
    const response = await profileAPI.updateProfileInfo(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfile(profile))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('editProfile', {_error: message}));
        return Promise.reject();
    }
};

export default profileReducer;
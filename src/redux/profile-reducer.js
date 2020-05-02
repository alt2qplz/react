import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = 'profile/SET_USER_PROFILE_STATUS';
const DELETE_POST = 'profile/DELETE_POST';

let initialState = {
    postsData: [
        {
            id: 1,
            message: 'Искусство бесполезно, потому что его цель – лишь создавать настроение. В его задачу не входит ни ' +
                'поучать, ни как-либо влиять на поступки. Оно великолепно в своей стерильности, и его стерильность ' +
                'неотделима от доставляемого им удовольствия. Если созерцание произведения искусства побуждает к ' +
                'какой-либо деятельности, это значит, что либо произведение весьма посредственно, либо созерцающий ' +
                'не сумел оценить его во всей художественной полноте.',
            likes: 10
        }
    ],
    newPostText: '',
    profile: null,
    profileStatus: ""
};

const profileReducer = (state = initialState, action) => {
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

        default:
            return state;
    }

};


export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserProfileStatus = (status) => ({type: SET_USER_PROFILE_STATUS, status});

export const getProfile = userId => async dispatch => {
    const response = await profileAPI.getProfileInfo(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = userId => async dispatch => {
    const response = await profileAPI.getProfileStatus(userId);
    dispatch(setUserProfileStatus(response.data))
};

export const updateStatus = status => async dispatch => {
    const response = await profileAPI.updateProfileStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
};

export default profileReducer;
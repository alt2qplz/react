import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = 'SET_USER_PROFILE_STATUS';

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
            if (typeof state.newPostText !== 'undefined' && state.newPostText !== "") {

                return {
                    ...state,
                    postsData: [...state.postsData, {id: 3, likes: 0, message: state.newPostText}],
                    newPostText: ''
                }
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.text
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


export const addPost = () => ({type: ADD_POST});
export const updateNewPost = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserProfileStatus = (status) => ({type: SET_USER_PROFILE_STATUS, status});


export const getProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfileInfo(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
};

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getProfileStatus(userId)
            .then(response => {
                dispatch(setUserProfileStatus(response.data))
            })
    }
};

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateProfileStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserProfileStatus(status))
                }
            })
    }
};

export default profileReducer;
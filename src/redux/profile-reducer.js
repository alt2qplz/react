import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = 'profile/SET_USER_PROFILE_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PHOTO_SUCCESS = 'profile/SET_USER_PHOTO_SUCCESS';
const IS_FETCHING = 'profile/IS_FETCHING';

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
  ],
  newPostText: '',
  profile: null,
  profileStatus: "",
  isFetching: false
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

    case SET_USER_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
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


export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserProfileStatus = (status) => ({type: SET_USER_PROFILE_STATUS, status});
export const setUserPhotoSuccess = (photos) => ({type: SET_USER_PHOTO_SUCCESS, photos});
export const isFetchingToggle = (isFetching) => ({type: IS_FETCHING, isFetching});

export const getProfile = userId => async dispatch => {
  dispatch(isFetchingToggle(true));
  const response = await profileAPI.getProfileInfo(userId);
  dispatch(setUserProfile(response.data));
  dispatch(isFetchingToggle(false));
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

export const updatePhoto = photoFile => async dispatch => {
  const response = await profileAPI.updateProfilePhoto(photoFile);
  if (response.data.resultCode === 0) {
    dispatch(setUserPhotoSuccess(response.data.data.photos))
  }
};

export const updateProfile = profile => async dispatch => {
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
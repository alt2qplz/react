import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store/redux-store";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthReducerActionTypes):InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

type AuthReducerActionTypes = SetAuthUserDataType | GetCaptchaUrlSuccessActionType

type SetAuthUserDataPayloadType = {
    //Type for payload in AuthUserData
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

//thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthReducerActionTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.getAuthMe();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        // @ts-ignore
        dispatch(stopSubmit('login', {_error: message})) //Что то связанное с Redux-Form
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptcha();
    const captchaUrl = captchaData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};

export default authReducer;
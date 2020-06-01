import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store/redux-store";

const INITIALIZED = 'app/INITIALIZED';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof INITIALIZED
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED});

type AppReducerActionType = InitializedSuccessActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppReducerActionType>

export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccess());
};

export default appReducer;
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED = 'app/INITIALIZED';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
};

export default appReducer;
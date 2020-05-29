import {dialogsAPI} from "../../api/api";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';
const SET_FETCHING = 'dialogs/SET_FETCHING';

type InitialStateType = {
    messagesData: Array<any>,
    dialogsData: Array<any>,
    isFetching: boolean
}

let initialState = {
    messagesData: [],
    dialogsData: [],
    isFetching: false
}

const dialogReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case SET_MESSAGES: {
            return {
                ...state,
                messagesData: [...action.messages]
            }
        }

        case SET_DIALOGS: {
            return {
                ...state,
                dialogsData: [...action.dialogs]
            }
        }

        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default:
            return state;
    }
}

export const setAllDialogs = (dialogs: any) => ({type: SET_DIALOGS, dialogs})
export const setMessages = (messages: any) => ({type: SET_MESSAGES, messages})
export const setIsFetching = (isFetching: boolean) => ({type: SET_FETCHING, isFetching})

export const getAllDialogs = () => async (dispatch: any) => {
    const response = await dialogsAPI.getAllDialogs()
    dispatch(setAllDialogs(response.data))
};

export const getMessages = (userId: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    const response = await dialogsAPI.getMessages(userId);
    dispatch(setMessages(response.data.items))
    dispatch(setIsFetching(false))
};

export const sendMessageToUser = (userId: number, message: string) => async (dispatch: any) => {
    await dialogsAPI.sendMessageToUser(userId, message)
    dispatch(getMessages(userId))
};

export default dialogReducer
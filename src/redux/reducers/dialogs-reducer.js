import {dialogsAPI} from "../../api/api";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';
const SET_FETCHING = 'dialogs/SET_FETCHING';

let initialState = {
    messagesData: [],
    dialogsData: [],
    isFetching: false,
    currentProfile: {
        "id": 7912,
        "userName": "dozer",
        "hasNewMessages": false,
        "lastDialogActivityDate": "2020-05-18T13:41:11.187",
        "lastUserActivityDate": "2020-05-18T13:41:17.703",
        "newMessagesCount": 0,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/7912/user-small.jpg?v=1",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/7912/user.jpg?v=1"
        }
    }
};

const dialogReducer = (state = initialState, action) => {
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
};

export const setAllDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});
export const setIsFetching = (isFetching) => ({type: SET_FETCHING, isFetching});

export const getAllDialogs = () => async dispatch => {
    const response = await dialogsAPI.getAllDialogs();
    dispatch(setAllDialogs(response.data))
};

export const getMessages = (userId) => async dispatch => {
    dispatch(setIsFetching(true));
    const response = await dialogsAPI.getMessages(userId);
    dispatch(setMessages(response.data.items));
    dispatch(setIsFetching(false))
};

export const sendMessageToUser = (userId, message) => async dispatch => {
    await dialogsAPI.sendMessageToUser(userId, message);
    dispatch(getMessages(userId));
};

export default dialogReducer;
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    messagesData: [
        {id: 1, messege: 'Привет', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: true},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: false},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: true},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: true},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: false},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: false},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: true},
    ],
    dialogsData: [
        {id: 1, name: 'Alexander', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png'},
        {id: 2, name: 'Masha', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png'},
        {id: 3, name: 'Anna', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png'},
        {id: 4, name: 'Kostya', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png'},
        {id: 5, name: 'Vlad', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png'},
    ],
    newMessage: ''

};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            if (typeof state.newMessage !== 'undefined' && state.newMessage !== '') {
                return {
                    ...state,
                    messagesData: [...state.messagesData, {id: 2, messege: state.newMessage, avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: true}],
                    newMessage: ''
                }
            }
        }
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessage: action.body
            }
        }
        default:
            return state;
    }


};

export const updateNewMessageBody = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body});
export const sendMessage = () => ({type: SEND_MESSAGE});

export default dialogReducer;
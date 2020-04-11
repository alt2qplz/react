const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    messagesData: [
        {id: 1, messege: 'Привет', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 1},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 0},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 1},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 1},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 0},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 0},
        {id: 2, messege: 'Yo', avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png', senderMe: 1},
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
            let stateCopy = {...state};

            let newMessage = {
                id: 1,
                messege: state.newMessage,
                avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png',
                senderMe: 1
            };
            stateCopy.messagesData = [...state.messagesData];
            stateCopy.messagesData.push(newMessage);
            stateCopy.newMessage = '';
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_BODY: {
            let stateCopy = {...state}

            stateCopy.newMessage = action.body;
            return stateCopy;
        }
        default:
            return state;
    }


};

export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export default dialogReducer;
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

const dialogReducer = (state, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 1,
                messege: state.newMessage,
                avatar: 'https://static.tildacdn.com/tild6536-6139-4562-a430-346635653332/Group.png',
                senderMe: 1
            };
            state.messagesData.push(newMessage);
            state.newMessage = '';
            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessage = action.body;
            return state;
        default:
            return state;
    }


};

export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export default dialogReducer;
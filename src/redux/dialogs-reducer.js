const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messagesData: [
        {
            id: 1,
            message: 'Привет',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            senderMe: true
        },
        {
            id: 2,
            message: 'Yo',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            senderMe: false
        },
        {
            id: 2,
            message: 'Как дела?',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            senderMe: true
        },
        {
            id: 2,
            message: 'Нормально, у тебя как?',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            senderMe: false
        }
    ],
    dialogsData: [
        {
            id: 1,
            name: 'Alexander',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        },
        {id: 2, name: 'Masha', avatar: 'https://www.w3schools.com/howto/img_avatar.png',},
        {id: 3, name: 'Anna', avatar: 'https://www.w3schools.com/howto/img_avatar.png',},
        {id: 4, name: 'Kostya', avatar: 'https://www.w3schools.com/howto/img_avatar.png',},
        {id: 5, name: 'Vlad', avatar: 'https://www.w3schools.com/howto/img_avatar.png',},
    ],

};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messagesData: [
                    ...state.messagesData,
                    {
                        id: 2,
                        message: action.newMessage,
                        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                        senderMe: true
                    }
                ]
            }
        }
        default:
            return state;
    }
};

export const sendMessage = (newMessage) => ({type: SEND_MESSAGE, newMessage});

export default dialogReducer;
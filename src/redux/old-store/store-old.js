import profileReducer from "../reducers/profile-reducer";
import dialogReducer from "../reducers/dialogs-reducer";

/*
* Этот стор имитирует работу редакса, и был создал в процессе обучения как обучающий макет
* */

let storeOld = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message:'Привет', likes: 10},
                {id: 1, message:'Привет', likes: 10}
            ],
            newPostText: 'Вот тут находится дефолтное сообщение'
        },
        dialogsPage: {
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
        }
    },

    _renderAll() {
        console.log('123sdfa');
    },

    subscribe (observer) {
        this._renderAll = observer;
    },
    getState() {
        return this._state
    },

    dispatch (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);

        this._renderAll(this._state);
    }

};

export default storeOld;
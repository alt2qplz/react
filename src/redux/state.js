let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message:'Привет', likes: 10},
                {id: 1, message:'Привет', likes: 10}
            ],
            newPostText: 'Привет, 123'
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
            ]
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
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likes: 0
            };

            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._renderAll(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.text;
            this._renderAll(this._state);
        }
    }

};

export default store;
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postsData: [
        {id: 1, message:'Привет', likes: 10},
        {id: 1, message:'Привет', likes: 10}
    ],
    newPostText: 'Вот тут находится дефолтное сообщение'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = {...state};

            let newPost = {
                id: 3,
                message: state.newPostText,
                likes: 0
            };

            stateCopy.postsData = [...state.postsData];
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};

            stateCopy.newPostText = action.text;
            return stateCopy;
        }
        default:
            return state;
    }

};


export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, text: text});

export default profileReducer;
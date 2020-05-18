import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "../reducers/profile-reducer";
import dialogReducer from "../reducers/dialogs-reducer";
import usersReducer from "../reducers/users-reducer";
import authReducer from "../reducers/auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "../reducers/app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
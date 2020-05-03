import React, { Suspense, lazy } from 'react';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import './App.css';
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";

//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

//import Dialogs from "./components/Dialogs/Dialogs";
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));

//import News from "./components/News/News";
const News = lazy(() => import('./components/News/News'));

//import Music from "./components/Music/Music";
const Music = lazy(() => import('./components/Music/Music'));

//import Settings from "./components/Settings/Settings";
const Settings = lazy(() => import('./components/Settings/Settings'));

//import UsersContainer from "./components/Users/UsersContainer";
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

//import Login from "./components/Login/Login";
const Login = lazy(() => import('./components/Login/Login'));





class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render = () => {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return <div className='app-wrapper'>
            <HeaderContainer/>
            <NavbarContainer/>
            <div className="app-wrapper-content">
                <Suspense fallback={<Preloader />}>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <Dialogs/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </Suspense>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp = props => {
    return <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
};

export default SamuraiJSApp;
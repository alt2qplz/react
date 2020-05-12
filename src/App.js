import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import './App.css';
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import {getFriends} from "./redux/users-reducer";
import EditProfileContainer from "./components/EditProfile/EditProfile";


//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

//import Dialogs from "./components/Dialogs/Dialogs";
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));

//import UsersContainer from "./components/Friends/UsersContainer";
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

//import Login from "./components/Login/Login";
const Login = lazy(() => import('./components/Login/Login'));

//import FriendsContainer from "./components/Friends/FriendsContainer";
const FriendsContainer = lazy(() => import('./components/Friends/FriendsContainer'));

//import Games from "./components/Games/Games";
const Games = lazy(() => import('./components/Games/Games'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
    //this.props.isAuth && this.props.getFriends(3);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isAuth !== this.props.isAuth && this.props.isAuth === true) {
      this.props.getFriends(3)
    }
  }

  render = () => {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return <div className='app-wrapper'>
      <HeaderContainer/>
      <NavbarContainer/>
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader/>}>
          <Switch>
          <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
          <Route path='/editprofile' render={() => <EditProfileContainer />}/>
          <Route path='/dialogs' render={() => <Dialogs/>}/>
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/friends' render={() => <FriendsContainer/>}/>
          <Route path='/games' render={() => <Games />}/>
          <Route path='/login' render={() => <Login/>}/>
            <Redirect exact path='/' to="/profile"/>
            <Redirect exact path='/profile' to="/profile/:userId?"/>
            <Route path='*' render={() => <div>404</div>}/>
          </Switch>
        </Suspense>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
  friends: state.usersPage.friends
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp, getFriends})
)(App);

const SamuraiJSApp = props => {
  return <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
};

export default SamuraiJSApp;
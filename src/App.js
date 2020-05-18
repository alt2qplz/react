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

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const Login = lazy(() => import('./components/Login/Login'));
const FriendsContainer = lazy(() => import('./components/Friends/FriendsContainer'));
const Games = lazy(() => import('./components/Games/Games'));
const PageNotFound = lazy(() => import('./components/PageNotFound/PageNotFound'));
const EditProfileContainer = lazy(() => import('./components/EditProfile/EditProfile'));
const CowsBulls = lazy(() => import('./components/BullsAndCows/BullsAndCows'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
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
            <Route path='/editprofile' render={() => <EditProfileContainer/>}/>
            <Route path='/dialogs' render={() => <Dialogs/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/friends' render={() => <FriendsContainer/>}/>
            <Route path='/games' render={() => <Games/>}/>
            <Route path='/bullscows' render={() => <CowsBulls/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Redirect exact path='/' to="/profile"/>
            <Redirect exact path='/profile' to="/profile/:userId?"/>
            <Route path='*' render={() => <PageNotFound/>}/>
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
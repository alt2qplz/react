import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {setFriends} from "../../redux/users-reducer";

class HeaderContainer extends React.Component {

  logout = () => {
    this.props.logout();
    this.props.setFriends([]);
  };

  render = () => {
    return <Header {...this.props} logout={this.logout}/>
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  id: state.auth.id,
  email: state.auth.email,
});

export default connect(mapStateToProps, {logout, setFriends})(HeaderContainer);
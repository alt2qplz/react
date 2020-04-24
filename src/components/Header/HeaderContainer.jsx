import React from "react";
import Header from "./Header";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    componentDidUpdate() {
        this.props.getAuthUserData();
    }

    render = () => {
        return <Header {...this.props} />
    }
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    email: state.auth.email,
});

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);
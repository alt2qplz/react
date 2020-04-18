import React from "react";
import * as axios from "axios";
import Header from "./Header";
import {setAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }
    render = () => {
        return <Header {...this.props} />
    }
};

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
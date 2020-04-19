import React from "react";
import Header from "./Header";
import {getAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {

        /*authAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });*/

        this.props.getAuthUserData();

    }
    render = () => {
        return <Header {...this.props} />
    }
};

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    login: state.auth.login,
    id: state.auth.id,
    email: state.auth.email,
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
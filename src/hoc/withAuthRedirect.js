import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

let withAuthRedirect = (Component) => {
    /*
    Получает на вход компоненту и оборачивает её ХОКом, который проверяет наличие авторизации.
    Если пользоаватель авторизирован - возвращает принятый на вход компонент, а если нет то возвращает редирект на логин
    */
    class redirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>;

            return <Component {...this.props} />
        }
    }

    return connect(mapStateToPropsRedirect)(redirectComponent);
};

export default withAuthRedirect;
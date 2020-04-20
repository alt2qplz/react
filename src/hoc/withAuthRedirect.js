import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsRedirect = (state) => ({
    isLogin: state.auth.isLogin
});

let withAuthRedirect = (Component) => {

    class redirectComponent extends React.Component {
        render() {
            if(!this.props.isLogin) return <Redirect to='/login' />;

            return <Component {...this.props} />
        }
    }

    let withRedirect = connect(mapStateToPropsRedirect)(redirectComponent);

    return withRedirect;
};

export default withAuthRedirect;
import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    myId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps,{})(Navbar);
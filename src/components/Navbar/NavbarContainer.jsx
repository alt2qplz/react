import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    myId: state.auth.id
});

export default connect(mapStateToProps,{})(Navbar);
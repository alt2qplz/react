import React from "react";
import Dialogue from "./Dialogue";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue);
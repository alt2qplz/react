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

const DialogueContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogue);

export default DialogueContainer;
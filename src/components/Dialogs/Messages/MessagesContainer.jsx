import React from "react";
import Messages from "./Messages";
import {connect} from "react-redux";
import {sendMessageToUser} from "../../../redux/reducers/dialogs-reducer";
import {reset} from "redux-form";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getProfile} from "../../../redux/reducers/profile-reducer";


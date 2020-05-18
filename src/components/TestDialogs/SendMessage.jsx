import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {sendMessageToUser} from "../../redux/reducers/dialogs-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {InputStandard} from "../common/FormControls/FormControls";

let SendMessage = props => {

    return <div className={'white-container'}>
        <form onSubmit={props.handleSubmit}>
            <p>UserID</p>
            <Field name='userId' type={'text'} component={InputStandard} placeholder={'7912'}/>
            <p>Message</p>
            <Field name='message' type={'text'} component={InputStandard} />
            <button>Отправить</button>
        </form>
    </div>

};

SendMessage = reduxForm({
    form: 'sendMessageTest'
})(SendMessage);

let SendMessageContainer = props => {

    const sendMessage = (formData) => {
        props.sendMessageToUser(formData.userId, formData.message)
    };

    return <SendMessage onSubmit={sendMessage} />
};

const mapStateToProps = state => {};

export default compose(
    connect(mapStateToProps, {sendMessageToUser}),
    withRouter,
)(SendMessageContainer)
import React from "react";
import s from "./Information.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    myStatus = React.createRef();

    activateEditMode() {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode() {
        let text = this.myStatus.current.value;
        this.setState({
            editMode: false,
            status: text
        })
    }

    render () {
        return(
        <div>
            {!this.state.editMode &&
            <div>
                <span onClick={this.activateEditMode.bind(this)}>{this.state.status}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input ref={this.myStatus} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} type="text"/>
            </div>
            }
        </div>
        )}


}

export default ProfileStatus;

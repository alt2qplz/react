import React from "react";
import s from "./Information.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState( {
            editMode: true
        } );
    };
    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        } );
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onClick={this.activateEditMode}>{this.state.status || 'no status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onStatusChange}
                           type="text" value={this.state.status}/>
                </div>
                }
            </div>
        )
    }


}

export default ProfileStatus;

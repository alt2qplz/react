import React, {useEffect, useState} from "react";
import s from "./Information.module.css";

const ProfileStatus = props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

    const keyPressed = (e) => {
        if (e.key === "Enter") {
            deactivateEditMode()
        }
    };

    return (
        <div className={s.status}>
            {!editMode &&
            <div>
                <span onClick={activateEditMode}>{status || 'no status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} onKeyPress={keyPressed}
                       type="text" value={status}/>
            </div>
            }
        </div>
    )

}

export default ProfileStatus;

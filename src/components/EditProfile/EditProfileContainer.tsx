import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {getProfile, updateProfile} from "../../redux/reducers/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import EditProfile from "./EditProfile";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/store/redux-store";

type MapStatePropsType ={
    profile: any
    id: number | null
}

type MapDispatchPropsType = {
    updateProfile: (profile: ProfileType) => void
    getProfile: (userId: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const EditProfileContainer: React.FC<PropsType> = props => {

    const [profile, setProfile] = useState(props.profile);

    useEffect(() => {
        setProfile(props.profile)
    }, [props.profile]);

    let submit = (formData: any) => {
        // @ts-ignore
        props.updateProfile(formData).then(() => {props.history.push('/profile')})
    };

    if (profile === null && props.id !== null) {
        props.getProfile(props.id);
        return <Preloader/>
    }

    return <EditProfile onSubmit={submit} initialValues={profile}/>
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    id: state.auth.id
});

export default compose(
    connect(mapStateToProps, {updateProfile, getProfile}),
    withRouter,
    withAuthRedirect
)(EditProfileContainer)

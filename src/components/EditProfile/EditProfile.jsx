import React, {useEffect, useState} from "react";
import s from './EditProfile.module.css';
import {Field, reduxForm} from "redux-form";
import {InputStandard} from "../common/FormControls/FormControls";
import {hyperlink, required} from "../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {getProfile, updateProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

let EditProfile = (props) => {
  return (
    <div className={'white-container'}>
      <form onSubmit={props.handleSubmit} className={s.editProfile}>
        <Field type={'hidden'} name={'userId'} component={InputStandard} validate={[required]}/>
        <h2>
          Основная информация
        </h2>
        <div className={s.editProfileField}>
          <p>Имя</p>
          <Field type={'text'} name={'fullName'} component={InputStandard} placeholder={'fullName'}
                 validate={[required]}/>
        </div>
        <div className={s.editProfileField}>
          <p>В поиске работы:</p>
          <Field type={'checkbox'} name={'lookingForAJob'} component={'input'} className={s.appleSwitch}/>
        </div>

        <div className={s.editProfileField}>
          <p>Мои навыки</p>
          <Field type={'text'} name={'lookingForAJobDescription'} component={InputStandard}
                 placeholder={'lookingForAJobDescription'}
                 validate={[required]}/>
        </div>

        <div className={s.editProfileField}>
          <p>Обо мне</p>
          <Field type={'text'} name={'aboutMe'} component={InputStandard} placeholder={'aboutMe'}
                 validate={[required]} />
        </div>

        <h2 className={s.contactsTitle}>
          Контакты
        </h2>

        {Object.keys(props.initialValues.contacts).map(key => <ContactField key={key} contactTitle={key}/>)}

        {props.error && <div className={s.errorWrap}>
          <p>{props.error}</p>
        </div>}

        <button type="submit" className={s.loginButton}>Обновить</button>
      </form>

    </div>
  )
};

const ContactField = ({contactTitle}) => {
  return <div className={s.editProfileField}>
    <p>{contactTitle}</p>
    <Field type={"text"} name={`contacts.${contactTitle}`} component={InputStandard} placeholder={contactTitle} />
  </div>
};


EditProfile = reduxForm({
  form: 'editProfile'
})(EditProfile);


const EditProfileContainer = props => {

  const [profile, setProfile] = useState(props.profile);

  useEffect(() => {
    setProfile(props.profile)
  }, [props.profile]);

  let submit = formData => {
    props.updateProfile(formData).then(() => {
      props.history.push('/profile')
    })
  };

  if (profile === null) {
    props.getProfile(props.id);
    return <Preloader />
  }

  return <EditProfile onSubmit={submit} initialValues={profile} />
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  id: state.auth.id
});

export default compose(
  connect(mapStateToProps, {updateProfile, getProfile}),
  withRouter,
  withAuthRedirect
)(EditProfileContainer)

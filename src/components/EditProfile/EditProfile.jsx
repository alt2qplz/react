import React, {useEffect} from "react";
import s from './EditProfile.module.css';
import {Field, reduxForm} from "redux-form";
import {InputStandard} from "../common/FormControls/FormControls";
import {hyperlink, required} from "../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {updateProfile} from "../../redux/profile-reducer";

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

  let submit = formData => {
    props.updateProfile(formData).then(() => {
      props.history.push('/login')
    })
  };

  return <EditProfile onSubmit={submit} initialValues={props.profile} />
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

export default compose(
  connect(mapStateToProps, {updateProfile}),
  withRouter,
  withAuthRedirect
)(EditProfileContainer)

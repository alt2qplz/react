import React from "react";
import {Field, reduxForm} from 'redux-form';
import {maxLength15, required} from "../../utils/validators";
import {InputStandard} from "../common/FormControls/FormControls";
import s from './Login.module.css';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div>
                <Field type={'text'} name={'email'} component={InputStandard} placeholder={'Логин'}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={'password'} name={'password'} component={InputStandard} placeholder={'Пароль'}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} className={s.checkBox}/>
                Запомнить меня
            </div>
            {props.error && <div className={s.errorWrap}>
                <p>{props.error}</p>
            </div>}
            <button className={s.loginButton}>ВОЙТИ</button>
        </form>
    )
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);


const Login = (props) => {
    let submit = formData => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };



    if (props.isAuth) {

        return <Redirect to={'/profile'} />
    }

    return (
        <div className={`${s.loginFormWrap} white-container`}>
            <LoginForm onSubmit={submit}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);

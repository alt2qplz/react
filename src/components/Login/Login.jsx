import React from "react";
import {Field, reduxForm} from 'redux-form';
import {maxLength15, required} from "../../utils/validators";
import {InputStandard} from "../common/FormControls/FormControls";
import s from './Login.module.css';


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div>
                <Field type={'text'} name={'Login'} component={InputStandard} placeholder={'Логин'}
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field type={'text'} name={'Password'} component={InputStandard} placeholder={'Пароль'}
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'RememberPassword'} component={'input'} className={s.checkBox}/>
                Запомнить меня
            </div>
            <button className={s.loginButton}>ВОЙТИ</button>
        </form>
    )
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);


const Login = (props) => {
    let submit = values => {
        console.log(values)
    };

    return (
        <div className={`${s.loginFormWrap} white-container`}>
            <LoginForm onSubmit={submit}/>
        </div>
    )
};

export default Login;

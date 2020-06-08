import React from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {required} from "../../utils/validators";
import {InputStandard} from "../common/FormControls/FormControls";
import s from './Login.module.css';
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/store/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
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
            <div className={s.appleSwitchWrap}>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} className={s.appleSwitch}/>
                Запомнить меня
            </div>
            <div>
                {
                    props.captchaUrl && <img src={props.captchaUrl}/>
                }
                {
                    props.captchaUrl &&
                    <Field type={'text'} name={'captcha'} component={InputStandard} placeholder={'Введите символы'}
                           validate={[required]}/>

                }
            </div>
            {props.error && <div className={s.errorWrap}>
                <p>{props.error}</p>
            </div>}
            <button className={s.loginButton}>ВОЙТИ</button>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string

}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let submit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={`${s.loginFormWrap} white-container`}>
            <LoginReduxForm onSubmit={submit} captchaUrl={props.captchaUrl}/>
        </div>
    )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);

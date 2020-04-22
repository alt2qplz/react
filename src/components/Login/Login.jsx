import React from "react";
import {Field, reduxForm} from 'redux-form';

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type={'text'} name={'Login'} component={'input'} placeholder={'Login here'}/>
            </div>
            <div>
                <Field type={'text'} name={'Password'} component={'input'} placeholder={'Pass here'}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'RememberPassword'} component={'input'}/>
                RememberME
            </div>
            <button>login</button>
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
        <div className={`white-container`}>
            <LoginForm onSubmit={submit}/>
        </div>
    )
};

export default Login;

import React, {useEffect, useState} from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../img/react-logo.png';

const Header = (props) => {

    let [isAuth, setIsAuth] = useState(props.isAuth);

    useEffect(() => {
        setIsAuth(props.isAuth)
    }, [props.isAuth]);

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <img
                    src={logo}
                    alt=""/>
                <h2>Social-React-Network</h2>
            </div>

            {isAuth
                ? <div className={s.base_info}>
                    <p>id: <span>{props.id}</span></p>
                    <p>email: <span>{props.email}</span></p>
                    <p>login: <span>{props.login}</span></p>
                    <NavLink to='/'>
                        <button className={s.logout} onClick={props.logout}>Выход</button>
                    </NavLink>
                </div>
                : <NavLink to='/login'>
                    <button className={s.login}>
                        Вход
                    </button>
                </NavLink>}

        </header>
    )
};

export default Header;
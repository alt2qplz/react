import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAZWYIPyXuDqI99-_2zURPvzu4Hq9kja7D-QxcBSh508lcXSOF"
                alt=""/>

            {props.isAuth
                ? <div className={s.base_info}>
                    <p>id: <a href="#">{props.id}</a></p>
                    <p>email: <a href="#">{props.email}</a></p>
                    <p>login: <a href="#">{props.login}</a></p>
                    <button onClick={props.logout}>Выход</button>
                </div>
                : <NavLink to='/login' className={s.login}>Вход</NavLink>}

        </header>
    )
};

export default Header;
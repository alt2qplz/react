import React from "react";
import MyFriends from "./MyFriends/MyFriends";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={s.sideBar}>
            <nav  className={s.nav}>
                <NavLink to='/profile' className={`${s.item} ${s.active}`}>
                    Мой профиль
                </NavLink>
                <NavLink to="/dialogs" className={s.item}>
                    Сообщения
                </NavLink>
                <NavLink to="/users" className={s.item}>
                    Пользователи
                </NavLink>
                <NavLink to="/news" className={s.item}>
                    Новости
                </NavLink>
                <NavLink to="/music" className={s.item}>
                    Музыка
                </NavLink>
                <NavLink to="/settings" className={s.item}>
                    Настройки
                </NavLink>

            </nav>
            <MyFriends />
        </div>
    )
};



export default Navbar;
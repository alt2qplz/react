import React from "react";
import MyFriends from "./MyFriends/MyFriends";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className={s.sideBar}>
      <nav className={s.nav}>
        <NavLink to={'/profile/' + (props.myId !== null ? props.myId : 2)} activeClassName={s.activeLink}
                 className={s.item}>
          Мой профиль
        </NavLink>
        <NavLink to="/dialogs" className={s.item} activeClassName={s.activeLink}>
          Сообщения
        </NavLink>


        <NavLink to="/friends" className={s.item} activeClassName={s.activeLink}>
          Мои подписки
        </NavLink>
        <NavLink to="/users" className={s.item} activeClassName={s.activeLink}>
          Все пользователи
        </NavLink>
      </nav>

      {props.isAuth &&
      <MyFriends/>
      }
    </div>
  )
};


export default Navbar;
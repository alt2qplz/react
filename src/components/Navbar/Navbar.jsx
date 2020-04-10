import React from "react";
import MyFriends from "./MyFriends/MyFriends";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={s.sideBar}>
            <nav  className={s.nav}>
                <NavLink to='/profile' className={`${s.item} ${s.active}`}>
                    Profile
                </NavLink>
                <NavLink to="/dialogs" className={s.item}>
                    Messages
                </NavLink>
                <NavLink to="/news" className={s.item}>
                    News
                </NavLink>
                <NavLink to="/music" className={s.item}>
                    Music
                </NavLink>
                <NavLink to="/settings" className={s.item}>
                    Settings
                </NavLink>

            </nav>
            <MyFriends />
        </div>
    )
};



export default Navbar;
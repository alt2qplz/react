import React from "react";
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAZWYIPyXuDqI99-_2zURPvzu4Hq9kja7D-QxcBSh508lcXSOF" alt=""/>
            <a href="#">
                Login
            </a>
        </header>
    )
};

export default Header;
import React from "react";
import s from './Header.module.css';

const Header = (props) => {

    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAZWYIPyXuDqI99-_2zURPvzu4Hq9kja7D-QxcBSh508lcXSOF"
                alt=""/>
            { props.isLogin ? <a href="#">{props.login}</a> : <a href="https://social-network.samuraijs.com/login">login</a>}



        </header>
    )
};

export default Header;
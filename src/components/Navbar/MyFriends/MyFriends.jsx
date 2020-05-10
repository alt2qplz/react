import React, {useEffect, useState} from "react";
import s from './MyFriends.module.css';
import {getFriendsSelector} from "../../../redux/users-selector";
import {connect} from "react-redux";
import {getFriends} from "../../../redux/users-reducer";
import {NavLink} from "react-router-dom";

const MyFriends = (props) => {
  /*
  Компонент, отвечающий за блок друзей в сайдбаре.
  Если идет загрузка (массив друзей пустой), то показывает заглушки.
  Если в массиве есть друзья, то тогда создает копию первых 3 элементов этого массива,
  и на основе нового массива рисует аватарки с сылками на профиль
  */

  let avatar = "https://www.w3schools.com/howto/img_avatar.png"; //Ава для тех, кто не поставил стандартную

  return (
    <div className={s.sideFriends}>
      <h3>
        Подписки
      </h3>
      <div className={s.friends}>
        {
          props.friends.length === 0
            ? <>
              <div className={s.friendBlock}></div>
              <div className={s.friendBlock}></div>
              <div className={s.friendBlock}></div>
            </>
            : props.friends.slice(0, 3).map(u => <div key={u.id}>
                  <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : avatar} alt="avatar"
                         className={s.avatar}/>
                  </NavLink>
                </div>)
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    friends: getFriendsSelector(state)
  }
};

export default connect(mapStateToProps, {getFriends})(MyFriends);

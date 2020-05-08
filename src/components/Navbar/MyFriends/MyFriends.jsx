import React, {useEffect, useState} from "react";
import s from './MyFriends.module.css';
import {getFriendsSelector} from "../../../redux/users-selector";
import {connect} from "react-redux";
import {getFriends} from "../../../redux/users-reducer";
import {NavLink} from "react-router-dom";

const MyFriends = (props) => {

  let avatar = "https://www.w3schools.com/howto/img_avatar.png";
  /*
  props.getFriends(3);

    useEffect(() => {

    }, [props.friends]);

    let myFriends = [];

      let [friends, setFriends] = useState(props.friends);

    useEffect( () => {
      setFriends(props.friends)
    }, [props.friends]);

      if (props.friends) {
        while (myFriends.length < 3) {
          myFriends.push(friends[Math.floor(Math.random() * friends.length)])
        }
      }*/

    return (
        <div className={s.sideFriends}>
            <h3>
                Мои друзья
            </h3>
            <div className={s.friends}>
              {
                props.friends.length === 0
                  ? <>
                    <div className={s.friendBlock}></div>
                    <div className={s.friendBlock}></div>
                    <div className={s.friendBlock}></div>
                    </>
                :props.friends
                .slice(0,3)
                .map(u =>
                <div key={u.id}>

                  <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : avatar} alt="avatar"
                         className={s.avatar}/>
                  </NavLink>
                </div>)}
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

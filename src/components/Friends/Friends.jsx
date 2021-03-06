import React from "react";
import s from './Friends.module.css';
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

const Friends = (props) => {

    let avatar = "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <>
            {props.isFetching
                ? <Preloader/>
                : <div className={s.wrapper}>
                    {props.friends
                        .map(u =>
                            <div key={u.id} className={`${s.user} white-container`}>

                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : avatar} alt="avatar"
                                         className={s.avatar}/>
                                </NavLink>

                                <div className={s.user_info}>
                                    <div>
                                        <h3>{u.name}</h3>
                                        <p>{u.status != null ? u.status : ' '}</p>
                                    </div>
                                    {u.followed ?
                                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                className={s.unsubscribe} onClick={() => {
                                            props.unfollow(u.id)
                                        }
                                        }>Отписаться</button>
                                        :
                                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                className={s.follow} onClick={() => {
                                            props.follow(u.id)
                                        }
                                        }>Подписаться</button>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </>
    )
};

export default Friends;

import React from "react";
import s from './User.module.css';
import Preloader from "../Common/Preloader/Preloader";

const Users = (props) => {

    let avatar = "https://www.w3schools.com/howto/img_avatar.png";

    /*
    let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    ОЧЕНЬ МНОГО НАРОДУ В РЕАЛЕ - СДЕЛАЮ ПОКА ПОМЕНЬШЕ
    */

    let pageCount = Math.ceil(200 / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className={`${s.pagination} white-container`}>
                {pages.map(p => {
                    return <div className={`${props.currentPage === p && s.selected} ${s.pagination_item}`}
                                onClick={(e) => {
                                    props.onPageChanged(p)
                                }}>{p}</div>
                })}
            </div>
            <div className={s.wrapper}>
                {props.users.map(u =>
                    <div key={u.id} className={`${s.user} white-container`}>
                        <img src={u.photos.small != null ? u.photos.small : avatar} alt="avatar"
                             className={s.avatar}/>
                        <div className={s.user_info}>
                            <div>
                                <h3>{u.name}</h3>
                                <p>{u.status != null ? u.status : 'Тут будет статус'}</p>
                            </div>
                            {u.followed ?
                                <button className={s.unsubscribe} onClick={() => {
                                    props.unsubscribe(u.id)
                                }}>Отписаться</button>
                                :
                                <button className={s.follow} onClick={() => {
                                    props.follow(u.id)
                                }}>Подписаться</button>
                            }
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
};

export default Users;

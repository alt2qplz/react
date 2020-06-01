import React from "react";
import s from './User.module.css';
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";

type OwnPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    users: Array<UserType>
    isAuth: boolean
    followingInProgress: Array<number>

    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

type PropsType = OwnPropsType

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, onPageChanged,
                                        currentPage, isFetching, users,
                                        isAuth, followingInProgress, unfollow,
                                        follow}) => {

    let avatar: string = "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                       onPageChanged={onPageChanged} currentPage={currentPage}
            />

            {isFetching
                ? <Preloader/>
                : <div className={s.wrapper}>
                    {users.map(u =>
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
                                {isAuth &&
                                (u.followed
                                        ? <button disabled={followingInProgress.some(id => id === u.id)}
                                                  className={s.unfollow} onClick={() => {
                                            unfollow(u.id)
                                        }}>Отписаться</button>
                                        : <button disabled={followingInProgress.some(id => id === u.id)}
                                                  className={s.follow} onClick={() => {
                                            follow(u.id)
                                        }}>Подписаться</button>
                                )
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

export default Users;
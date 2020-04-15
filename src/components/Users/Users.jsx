import React from "react";
import s from './User.module.css';
import * as axios from 'axios';

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    };

    render = () => {

        let avatar = "https://www.w3schools.com/howto/img_avatar.png";

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];

        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <p className={this.props.currentPage === p && s.selected}
                        onClick={ (e) => { this.onPageChanged(p) } }>{p}</p>
                    })}
                </div>
                <div className={s.wrapper}>


                    {
                        this.props.users.map(u =>

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
                                            this.props.unsubscribe(u.id)
                                        }}>Отписаться</button>
                                        :
                                        <button className={s.follow} onClick={() => {
                                            this.props.follow(u.id)
                                        }}>Подписаться</button>}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}


export default Users;

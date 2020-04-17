import React from "react";
import s from "./Information.module.css";
import Preloader from "../../Common/Preloader/Preloader";

const Information = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profile}>
            <img className={s.profile_img} src={require('../../../img/ykk.png')}/>
            <div className={s.main_info}>
                <img
                    src={props.profile.photos.large !== null ? props.profile.photos.large : "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="Аватар"/>
                <div className={s.text}>
                    <h2 className={s.name}>
                        {props.profile.fullName}
                    </h2>
                    <div className={s.description}>
                        {props.profile.aboutMe !== null ?
                            <p>Обо мне: <br/><b>{props.profile.aboutMe}</b></p>
                            :
                            ''
                        }
                    </div>
                    <div className={s.description}>
                        {props.profile.lookingForAJob !== null ?
                            <p>Статус
                                поиска: <br/><b>{props.profile.lookingForAJob ? 'Я ищу работу' : 'Я не ищю работу'}</b>
                            </p>
                            :
                            ''
                        }
                    </div>
                    <div className={s.description}>
                        {props.profile.lookingForAJobDescription !== null ?
                            <p>Описание желаемой вакансии: <br/><b>{props.profile.lookingForAJobDescription}</b></p>
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Information;

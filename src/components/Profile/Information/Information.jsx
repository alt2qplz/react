import React from "react";
import s from "./Information.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Information = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length !== 0) {
            props.updatePhoto(e.target.files[0])
        }
    };

    return (
        <div className={s.profile}>
            {/*<img className={s.profile_img} src={require('../../../img/ykk.png')}/>*/}
            <div className={s.main_info}>
                <div>
                    {
                        props.isOwner
                        ? <div><input className={s.inputfile} name="file" id="file" type='file' onChange={onMainPhotoSelected}/><label htmlFor="file"><img
                                src={props.profile.photos.large !== null ? props.profile.photos.large : "https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/ke17ZwdGBToddI8pDm48kKVo6eXXpUnmuNsFtLxYNDVZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7abfyk2s94xLLkDA7TSo2rckMlGDU48FfF-V7lLcSuGNU_Uf7d6wOiJwP-LWX64gbQ/image-asset.gif"}
                                alt="Аватар"/></label></div>
                            : <img
                                src={props.profile.photos.large !== null ? props.profile.photos.large : "https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/ke17ZwdGBToddI8pDm48kKVo6eXXpUnmuNsFtLxYNDVZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7abfyk2s94xLLkDA7TSo2rckMlGDU48FfF-V7lLcSuGNU_Uf7d6wOiJwP-LWX64gbQ/image-asset.gif"}
                                alt="Аватар"/>
                    }


                    

                </div>
                <div className={s.text}>
                    <h2 className={s.name}>
                        {props.profile.fullName}
                    </h2>

                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                    <div className={s.description}>
                        <p>
                            Обо мне:
                            {props.profile.aboutMe !== null ?
                                <b> {props.profile.aboutMe}</b>
                                :
                                ''
                            }
                        </p>
                    </div>
                    <div className={s.description}>
                        <p>Статус поиска:
                            {props.profile.lookingForAJob !== null ?
                                <b> {props.profile.lookingForAJob ? 'Я ищу работу' : 'Я не ищю работу'}</b>
                                :
                                ''
                            }
                        </p>
                    </div>
                    <div className={s.description}>
                        <p>Желаемая вакансия:
                            {props.profile.lookingForAJobDescription !== null ?
                                <b> {props.profile.lookingForAJobDescription}</b>
                                :
                                ''
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Information;

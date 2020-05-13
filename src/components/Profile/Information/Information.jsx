import React from "react";
import s from "./Information.module.css";
import "./social.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import cn from 'classnames';
import {setUserFollowStatus} from "../../../redux/profile-reducer";

const Avatar = props => {
  return (
    <img
      src={props.avatar !== null ? props.avatar : "https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/ke17ZwdGBToddI8pDm48kKVo6eXXpUnmuNsFtLxYNDVZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7abfyk2s94xLLkDA7TSo2rckMlGDU48FfF-V7lLcSuGNU_Uf7d6wOiJwP-LWX64gbQ/image-asset.gif"}
      alt="Аватар"/>
  )
};

const Information = (props) => {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length !== 0) {
      props.updatePhoto(e.target.files[0])
    }
  };

  const unfollow = (e) => {
    props.unfollow(props.profile.userId).then(() => {
      props.checkFollow(props.profile.userId);
    });
  };

  const follow = (e) => {
    props.follow(props.profile.userId).then(() => {
      props.checkFollow(props.profile.userId);
    });

  };

  return (
    <>
      <div className={s.profile}>
        <div className={s.main_info}>
          <div className={cn(s.leftSide)}>
            {
              props.isOwner
                ? <div>
                  <input className={s.inputfile} name="file" id="file" type='file'
                         onChange={onMainPhotoSelected}/>
                  <label htmlFor="file">
                    <Avatar avatar={props.profile.photos.large}/>
                  </label>
                </div>
                : <Avatar avatar={props.profile.photos.large}/>
            }


            {
              !props.isOwner &&
              (props.userFollowStatus ?
                <button disabled={props.followingInProgress.some(id => id === props.profile.userId)}
                        className={s.unfollow} onClick={unfollow}>Отписаться</button>
                :
                <button disabled={props.followingInProgress.some(id => id === props.profile.userId)}
                        className={s.follow} onClick={follow}>Подписаться</button>)
            }

          </div>




          <div className={s.text}>
            <h2 className={s.name}>
              {props.profile.fullName}
            </h2>
            {props.isOwner
              ? <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
              : <div className={s.status}>
                <span>{props.status || 'no status'}</span>
              </div>
            }
            <div className={s.description}>
              <p>
                {props.profile.lookingForAJob !== null ?
                  <b> {props.profile.lookingForAJob ? 'Я ищу работу' : 'Я не ищю работу'}</b>
                  :
                  ''
                }
              </p>
            </div>
            <div className={s.description}>
              {props.profile.lookingForAJobDescription !== null
                ? <p>Мои умения:
                  <b> {props.profile.lookingForAJobDescription}</b>
                </p>
                :
                <p></p>
              }
            </div>
            <div className={s.description}>

              {props.profile.aboutMe !== null
                ?
                <p>
                  Обо мне:
                  <b> {props.profile.aboutMe}</b>
                </p>
                :
                <p></p>
              }

            </div>
          </div>
        </div>
      </div>
      <div className={`white-container socialWrap`}>
        {Object.keys(props.profile.contacts).map(key => <Contact key={key} contactTitle={key}
                                                                 contactValue={props.profile.contacts[key]}/>)}

      </div>

    </>
  )
};

const Contact = ({contactTitle, contactValue}) => {
  return <div className={`socialIcon ${contactTitle}`}>
    {contactValue
      ? <a href={
        contactValue.includes("https://")
          ? `${contactValue}`
          : `https://${contactValue}`
      } target='_blank'>
        <div className={`active`}></div>
      </a>
      : <div className={`disable`}></div>}


  </div>
};

export default Information;

import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div>
            <img className={s.profile_img} src={require('../../img/ykk.png')}/>
            <div className={s.main_info}>
                <img src={require('../../img/polar_bear.jpg')} alt=""/>
                <div className={s.text}>
                    <h2 className={s.name}>
                        Alexander
                    </h2>
                    <p className={s.description}>
                        Maecenas metus urna, sodales at est non, laoreet posuere erat. Suspendisse fringilla et
                        quam sed tincidunt. Duis varius arcu lacus, quis maximus lacus faucibus ac. In hac habitasse platea dictumst.
                        Praesent quis mauris a orci tristique pretium.
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce gravida feugiat iaculis.
                    </p>
                </div>
            </div>
            <MyPosts/>
        </div>
    )
};

export default Profile;

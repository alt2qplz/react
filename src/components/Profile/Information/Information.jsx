import React from "react";
import s from "./Information.module.css";

const Information = () => {
    return (
        <div className={s.profile}>
            <img className={s.profile_img} src={require('../../../img/ykk.png')}/>
            <div className={s.main_info}>
                <img src={require('../../../img/polar_bear.jpg')} alt=""/>
                <div className={s.text}>
                    <h2 className={s.name}>
                        Alexander
                    </h2>
                    <p className={s.description}>
                        REACT-REDUX SAMURAI
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Information;

import React from 'react';
import preloaderGIF from '../../../img/Ring-Preloader.gif';
import s from './Preloader.module.css';

let Preloader = (props) => {
    return (
        <div className={s.preloader_block}>
            <img src={preloaderGIF} alt=""/>
        </div>
        )
};

export default Preloader;
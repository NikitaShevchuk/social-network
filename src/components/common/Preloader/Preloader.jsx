import React from "react";
import style from './Preloader.module.css'

const Preloader = () => {
    return <div className='preloader opacity-animation'>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
    </div>
}

export default Preloader;
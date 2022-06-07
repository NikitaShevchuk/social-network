import React from "react";
import style from './Preloader.module.css'

const Preloader = () => {
    return <div className='preloader'>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
    </div>
}

export default Preloader;
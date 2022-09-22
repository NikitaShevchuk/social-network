import React, { FC } from "react";

const Preloader: FC = () => {
    return <div className='preloader opacity-animation'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
    </div>
}

export default Preloader;
import React, { FC } from "react";

interface Props {
    size?: 'small' | 'large'
    isFetching?: boolean
}

const Preloader: FC<Props> = ({size, isFetching = true}) => {
    return (
        <div className={`preloader opacity-animation ${isFetching ? 'shown' : 'hidden'} ${size ? size : ''}`}>
            <span className={`loader ${size ? size : ''}`}></span>
        </div>
    )
}

export default Preloader
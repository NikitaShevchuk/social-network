import React, { FC } from 'react';

interface Props {
    size?: 'small' | 'large';
    isFetching?: boolean;
}

const Preloader: FC<Props> = ({ size, isFetching = true }) => (
    <div className={`preloader opacity-animation ${isFetching ? 'shown' : 'hidden'} ${size || ''}`}>
        <span className={`loader ${size || ''}`} />
    </div>
);

export default Preloader;

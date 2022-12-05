import React, {FC} from 'react';

interface Props {
    appError: string | null
}

const AppError: FC<Props> = ({appError}) => {
    return (
        <div className='globalPreloader'>
            <span className="loader"></span>
            <div className="appError">{appError}</div>
        </div>
    );
};

export default AppError;
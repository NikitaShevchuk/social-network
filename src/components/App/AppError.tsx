import React, { FC } from 'react';

interface Props {
    appError: string | null;
}

const AppError: FC<Props> = ({ appError }) => (
    <div className="globalPreloader">
        <span className="loader" />
        <div className="appError">{appError}</div>
    </div>
);

export default AppError;

import React, {FC} from 'react';

const ErrorComponent: FC<{errorText: string}> = ({errorText}) => {
    return (
        <div className='local-error'>
            <span className="text">{errorText}</span>
        </div>
    );
};

export default ErrorComponent;
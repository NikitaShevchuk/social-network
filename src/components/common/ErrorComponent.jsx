import React from 'react';

const ErrorComponent = (props) => {
    return (
        <div className='local-error'>
            <span className="text">{props.errorText}</span>
        </div>
    );
};

export default ErrorComponent;
import React, {FC} from 'react';

interface Props {
    refetch: () => void,
    errorText: string | null
}

const FetchError: FC<Props> = ({errorText, refetch}) => {
    return (
        <div className='fetch-error'>
            <span className="text">
                {errorText}
            </span>
            <span
                className="link"
                onClick={refetch}
            >
                Try again
            </span>
        </div>
    );
};

export default FetchError;
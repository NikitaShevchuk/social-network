import React, {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode
    itemsNumber: number
    isLoading: boolean
}

const MultiplyPreloader: FC<Props> = ({children, itemsNumber, isLoading}) => {
    return (
        <span className='opacity-animation'>
            {isLoading && Array.from(Array(itemsNumber)).map(
                () => children
            )}
        </span>
    );
};

export default MultiplyPreloader;
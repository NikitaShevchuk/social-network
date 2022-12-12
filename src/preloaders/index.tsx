import React, {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode
    itemsNumber: number
    isLoading: boolean
}

const MultiplyPreloader: FC<Props> = ({children, itemsNumber, isLoading}) => {
    return (
        <div>
            {isLoading && Array.from(Array(itemsNumber)).map(
                () => children
            )}
        </div>
    );
};

export default MultiplyPreloader;
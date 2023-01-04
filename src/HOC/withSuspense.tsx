import React, { FC, Suspense } from 'react';
import ProfilePreloader from '../preloaders/ProfilePreloader';

const WithSuspense = (Component: FC<any>) => {
    return (
        <Suspense fallback={<ProfilePreloader />}>
            <Component />
        </Suspense>
    );
};

export default WithSuspense;

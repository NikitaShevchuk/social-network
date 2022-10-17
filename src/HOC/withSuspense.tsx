import React, {FC, Suspense} from 'react';
import Preloader from "../preloaders/Preloader";
import ProfilePreloader from "../preloaders/ProfilePreloader";

const WithSuspense = (Component: FC<any>, preloader: JSX.Element = <Preloader/>) => {
    return (
        <Suspense fallback={<ProfilePreloader />}>
            <Component />
        </Suspense>
    );
};

export default WithSuspense;
import React, { Suspense } from 'react';
import Preloader from "../common/Preloader/Preloader";

const WithSuspense = (Component) => {
    return (
        <Suspense fallback={<Preloader/>}>
            <Component />
        </Suspense>
    );
};

export default WithSuspense;
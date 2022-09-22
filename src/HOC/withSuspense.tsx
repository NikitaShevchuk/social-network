import React, {FC, Suspense} from 'react';
import Preloader from "../common/Preloader/Preloader";

const WithSuspense = (Component: FC<any>) => {
    return (
        <Suspense fallback={<Preloader/>}>
            <Component />
        </Suspense>
    );
};

export default WithSuspense;
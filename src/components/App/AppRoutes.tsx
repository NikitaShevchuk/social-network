import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IRoute, privateRoutes, publicRoutes } from '../../routes';

interface Props {
    isAuthorized: boolean;
}

const AppRoutes: FC<Props> = ({ isAuthorized }) => (
    <Routes>
        <Route path="/">
            {isAuthorized
                ? privateRoutes.map((route: IRoute) => <Route {...route} key={route.path} />)
                : publicRoutes.map((route: IRoute) => <Route {...route} key={route.path} />)}
        </Route>
    </Routes>
);

export default AppRoutes;

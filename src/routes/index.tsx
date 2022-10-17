import React from "react";
import LoginContainer from "../components/Login/LoginContainer";
import WithSuspense from "../HOC/withSuspense";
import RightSidebar from "../components/RightSidebar";
import MainPage from "../components/MainContent/MainPage";
import {Navigate} from "react-router-dom";

const ProfileContainer = React.lazy(() => import('../components/MainContent/Profile/ProfileContainer'))
const MessagesContainer = React.lazy(() => import('../components/MainContent/Messages/MessagesContainer'))

export interface IRoute {
    path: string;
    element: React.ReactNode;
    exact?: boolean;
}


export const publicRoutes: IRoute[] = [
    {
        path: '',
        element: <><MainPage/><RightSidebar /></>,
        exact: true
    },
    {
        path: 'login',
        element: <><LoginContainer/><RightSidebar /></>
    },
    {
        path: '*',
        element: <Navigate to='login'/>
    },
];

export const privateRoutes: IRoute[] = [
    {
        path: '',
        element: <><MainPage/><RightSidebar /></>,
        exact: true
    },
    {
        path: 'profile',
        element: <>{WithSuspense(ProfileContainer)}<RightSidebar /></>
    },
    {
        path: 'profile/:userId',
        element: <>{WithSuspense(ProfileContainer)}<RightSidebar /></>
    },
    {
        path: 'messages',
        element: WithSuspense(MessagesContainer)
    },
    {
        path: 'messages/:userId',
        element: WithSuspense(MessagesContainer)
    },
    {
        path: '*',
        element: <Navigate to=''/>
    },
]
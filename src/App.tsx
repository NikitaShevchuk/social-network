import React, {FC, useEffect} from "react";
import './App.css';
import './common/assets/css/color.css';
import './common/assets/css/fonts.css';
import './common/assets/css/style.css';
import './common/assets/css/main.min.css';
import {Route, Routes} from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import {initializeApp, tryToReconnect} from "./redux/Reducers/appReducer/middleware";
import Preloader from "./common/Preloader/Preloader";
import {connect, ConnectedProps} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {IRoute, privateRoutes, publicRoutes} from "./routes";

library.add(fab, faAngleDown)


const App: FC<IappProps> = ({initializeApp, initialized, isAuthorized, appError, tryToReconnect}) => {

    const handleRejection = (event: { reason: { code: string } }) => {
        console.warn("Promise error"
            + event.reason);
        if (event.reason.code === 'ERR_NETWORK') tryToReconnect()
    }

    useEffect(() => {
        initializeApp()
        window.addEventListener("unhandledrejection", handleRejection);
    }, [])

    if (appError) return <div className='globalPreloader'><Preloader/><br/>
        <div className="appError">{appError}</div>
    </div>
    if (!initialized) return <div className='globalPreloader'><Preloader/></div>
    return (
        <div className="container">
            <div className="row">
                <LeftSidebar/>
                <Routes>
                    <Route path='/'>
                        {isAuthorized ?
                            privateRoutes.map((route: IRoute) => <Route {...route} key={route.path}/>)
                            :
                            publicRoutes.map((route: IRoute) => <Route {...route} key={route.path}/>)
                        }
                    </Route>
                </Routes>
            </div>
        </div>
    );

}


let mapStateToProps = (state: any) => ({
    initialized: state.app.initialized,
    isAuthorized: state.auth.isAuthorized,
    appError: state.app.appError
})

const connector = connect(mapStateToProps, {initializeApp, tryToReconnect})

export default connector(App);
type IappProps = ConnectedProps<typeof connector>;


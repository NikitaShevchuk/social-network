import React, {FC, useEffect} from "react";
import '../../common/assets/css/color.css';
import '../../common/assets/css/fonts.css';
import '../../common/assets/css/style.css';
import '../../common/assets/css/main.min.css';
import LeftSidebar from "../LeftSidebar";
import {initializeApp, tryToReconnect} from "../../redux/reducers/app-reducer/middleware";
import Preloader from "../../preloaders/Preloader";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/redux-store";
import ErrorsDisplay from "../Errors";
import AppRoutes from "./AppRoutes";

const App: FC<AppConnectedProps> = ({initializeApp, initialized, isAuthorized, appError, tryToReconnect}) => {
    const handleRejection = (event: { reason: { code: string } }) => {
        console.warn("Promise error" + event.reason)
    }
    useEffect(() => {
        initializeApp()
        window.addEventListener("unhandledrejection", handleRejection);
    }, [])
    if (appError) return (
        <div className='globalPreloader'><Preloader/><br/>
            <div className="appError">{appError}</div>
        </div>
    )
    if (!initialized) return (
        <div className='globalPreloader'><Preloader/></div>
    )
    return (
        <div className="container">
            <ErrorsDisplay />
            <div className="row">
                <LeftSidebar/>
                <AppRoutes isAuthorized={isAuthorized} />
            </div>
        </div>
    );

}

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.isInitialized,
    isAuthorized: state.auth.isAuthorized,
    appError: state.app.appError
})

const connector = connect(mapStateToProps, {initializeApp, tryToReconnect})

export default connector(App);
type AppConnectedProps = ConnectedProps<typeof connector>;


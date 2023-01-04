import React, { FC, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../common/assets/css/index.css';
import '../../common/assets/css/responsive.scss';
import { connect, ConnectedProps } from 'react-redux';
import LeftSidebar from '../LeftSidebar';
import { initializeApp, tryToReconnect } from '../../redux/reducers/app-reducer/middleware';
import Preloader from '../../preloaders/Preloader';
import { RootState } from '../../redux/redux-store';
import ErrorsDisplay from '../Errors';
import AppRoutes from './AppRoutes';
import AppError from './AppError';

const App: FC<AppConnectedProps> = ({ initializeApp, initialized, isAuthorized, appError }) => {
    const handleRejection = (event: { reason: { code: string } }) => {
        return event.reason;
    };
    useEffect(() => {
        initializeApp();
        window.addEventListener('unhandledrejection', handleRejection);
    }, []);

    if (appError) return <AppError appError={appError} />;

    if (!initialized) {
        return (
            <div className="globalPreloader">
                <Preloader />
            </div>
        );
    }

    return (
        <div className="container">
            <ErrorsDisplay />
            <div className="row main-wrapper">
                <LeftSidebar />
                <AppRoutes isAuthorized={isAuthorized} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.isInitialized,
    isAuthorized: state.auth.isAuthorized,
    appError: state.app.appError
});

const connector = connect(mapStateToProps, { initializeApp, tryToReconnect });

export default connector(App);
type AppConnectedProps = ConnectedProps<typeof connector>;

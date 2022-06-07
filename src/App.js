import React from "react";
import './App.css';
import './components/common/assets/css/color.css';
import './components/common/assets/css/fonts.css';
import './components/common/assets/css/style.css';
import './components/common/assets/css/main.min.css';
import './components/common/assets/css/responsive.css';
import {Route, Routes} from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import UsersContainer from "./components/MainContent/Users/UsersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {initializeApp} from "./components/redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import WithSuspense from "./components/HOC/withSuspense";

const Profile = React.lazy(() => import('./components/MainContent/Profile/Profile'))
const MessagesContainer = React.lazy(() => import('./components/MainContent/Messages/MessagesContainer'))

class App extends React.Component {
    handleRejection = (event) => {
        console.warn("Внимание: Необработанная ошибка Promise. Позор вам! Причина: "
            + event.reason);
        alert('Короче что-то не работает. Потом сделаю нормальное отображение ошибки, чтобы вот это кривое окно сверху не вылазило')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.handleRejection);
    }

    render() {
        if (!this.props.initialized) return <div className='globalPreloader'><Preloader/></div>
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <LeftSidebar/>
                        <Routes>
                            <Route exact path='/'
                                   element={<UsersContainer/>}/>

                            <Route exact path='/my-app'
                                   element={<UsersContainer/>}/>

                            <Route path='/messages'
                                   element={WithSuspense(MessagesContainer)}/>

                            <Route path='/messages/:userId'
                                   element={WithSuspense(MessagesContainer)}/>

                            <Route path='/login'
                                   element={<LoginContainer/>}/>

                            <Route path={'/profile'}
                                   element={WithSuspense(Profile)}/>

                            <Route path={'/profile/:userId'}
                                   element={WithSuspense(Profile)}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);

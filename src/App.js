import React from "react";
import './App.css';
import './components/common/assets/css/color.css';
import './components/common/assets/css/fonts.css';
import './components/common/assets/css/style.css';
import './components/common/assets/css/main.min.css';
import {Route, Routes} from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import LoginContainer from "./components/Login/LoginContainer";
import {initializeApp} from "./components/redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import WithSuspense from "./components/HOC/withSuspense";
import {connect} from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainPage from "./components/MainContent/MainPage";
import {Navigate} from "react-router-dom";

library.add(fab, faAngleDown)

const Profile = React.lazy(() => import('./components/MainContent/Profile/Profile'))
const MessagesContainer = React.lazy(() => import('./components/MainContent/Messages/MessagesContainer'))

class App extends React.Component {
    handleRejection = (event) => {
        console.warn("Внимание: Необработанная ошибка Promise. Позор вам! Причина: "
            + event.reason);
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
                            <Route path='/'>

                                <Route path='' element={<><MainPage/><RightSidebar /></>}/>
                                <Route path='login' element={<><LoginContainer/><RightSidebar /></>}/>
                                <Route path='profile' element={<>{WithSuspense(Profile)}<RightSidebar /></>}/>
                                <Route path='profile/:userId' element={<>{WithSuspense(Profile)}<RightSidebar /></>}/>
                                <Route path='messages'  element={WithSuspense(MessagesContainer)}/>
                                <Route path='messages/:userId' element={WithSuspense(MessagesContainer)}/>
                                <Route path='*' element={<div>page not found</div>}/>

                            </Route>
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

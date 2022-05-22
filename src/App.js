import React from "react";
import './App.css';
import './components/common/assets/css/color.css';
import './components/common/assets/css/fonts.css';
import './components/common/assets/css/style.css';
import './components/common/assets/css/main.min.css';
import './components/common/assets/css/responsive.css';
import {Route, Routes} from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import FeedContainer from "./components/MainContent/Feed/FeedContainer";
import MessagesContainer from "./components/MainContent/Messages/MessagesContainer";
import UsersContainer from "./components/MainContent/Users/UsersContainer";
import ProfileContainer from "./components/MainContent/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {initializeApp} from "./components/redux/appReducer";
import Preloader from "./components/common/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <div className={'globalPreloader'}><Preloader/></div>
        return (
            <div className="App">
                <Routes>
                    <Route path={'/profile'} element={<ProfileContainer/>}/>
                    <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                </Routes>
                <div className="container">
                    <div className="row">
                        <LeftSidebar/>
                        <Routes>
                            <Route exact path='/'
                                   element={<FeedContainer/>}/>
                            <Route path='/messages/:userId'
                                   element={<MessagesContainer/>}/>
                            <Route path='/messages'
                                   element={<MessagesContainer/>}/>
                            <Route path='/users'
                                   element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginContainer/>}/>
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

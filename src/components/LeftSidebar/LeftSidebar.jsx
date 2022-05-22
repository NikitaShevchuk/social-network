import React from "react";
import Shortcuts from "./Widgets/Shortcuts";
import {connect} from "react-redux";
import {logoutThunk} from "../redux/auth";

const LeftSidebar = (props) => {

    const logout = () => {
        props.logoutThunk()
    }

    return <aside className="sidebar static">
        <div className="widget">
            <Shortcuts {...props} logout={logout}/>
        </div>
    </aside>
}

let mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    userData: state.auth.userData
})

export default connect(mapStateToProps, {logoutThunk})(LeftSidebar);
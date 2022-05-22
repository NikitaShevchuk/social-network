import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";


let mapStateToPropsRedirect = (state) => ({
    isAuthorized: state.auth.isAuthorized
})

const WithRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthorized) return <Navigate replace to="/login" />
            return <Component />
        }
    }
    return connect(mapStateToPropsRedirect)(RedirectComponent);
}
export default WithRedirect;
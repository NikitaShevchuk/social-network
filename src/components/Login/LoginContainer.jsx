import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {loginThunk} from "../redux/auth";
import {Navigate} from "react-router-dom";

class LoginApi extends React.Component {
    submitForm = (formData) => {
        this.props.loginThunk(formData)
    }
    render() {
        if (this.props.isAuthorized) return <Navigate replace to={'/profile'} />
        return <div className="central-meta">
                <div className="editing-info">
                    <h5 className="f-title"><i className="ti-lock"/>Login</h5>
                    <Login {...this.props} submitForm={this.submitForm} />
                </div>
            </div>
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    loginFailed: state.auth.loginFailed,
    successLogin: state.auth.successLogin,
    captcha: state.auth.captcha,
    profileImg: state.auth.profileImg
})

const LoginContainer = connect(mapStateToProps, {loginThunk})(LoginApi)

export default LoginContainer;
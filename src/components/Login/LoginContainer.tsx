import React, {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import Login from "./Login";
import {loginThunk} from "../../redux/Reducers/authReducer/middleware";
import {setDialogs} from "../../redux/Reducers/messagesReducer/middleware";
import {modifyHeaders} from "../../api/api";

export interface FormValues {
    email: string
    password: string
    cookie: string
    rememberMe: boolean
}

const LoginApi: FC<LoginProps> = (props) => {
    const submitForm = (formValues: FormValues) => {
        props.loginThunk(formValues)
        // temporary solution
        localStorage.setItem('apiKey', formValues.cookie);
        modifyHeaders()
    }
    return <div className="central-meta">
        <h4 className="sidebarHeader">Login</h4>
        <div className="editing-info">
            <Login
                loginFailed={props.loginFailed}
                captcha={props.captcha}
                submitForm={submitForm}
            />
        </div>
    </div>
}

const mapStateToProps = (state: any) => ({
    loginFailed: state.auth.loginFailed,
    captcha: state.auth.captcha
})

const connector = connect(mapStateToProps, {loginThunk, setDialogs})
const LoginContainer = connector(LoginApi)
export default LoginContainer;
export type LoginProps = ConnectedProps<typeof connector>
import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import Login from "./Login";
import { loginThunk } from "../../redux/reducers/auth-reducer/middleware";
import { setDialogs } from "../../redux/reducers/dialogs-reducer/middleware";
import { modifyHeaders } from "../../services";

export interface FormValues {
    email: string;
    password: string;
    cookie: string;
    rememberMe: boolean;
}

const LoginApi: FC<LoginProps> = (props) => {
    const submitForm = (formValues: FormValues) => {
        props.loginThunk(formValues);
        // temporary solution
        localStorage.setItem("apiKey", formValues.cookie);
        modifyHeaders();
    };
    return (
        <Login
            loginFailed={props.loginFailed}
            captcha={props.captcha}
            submitForm={submitForm}
        />
    );
};

const mapStateToProps = (state: any) => ({
    loginFailed: state.auth.loginFailed,
    captcha: state.auth.captcha,
});

const connector = connect(mapStateToProps, { loginThunk, setDialogs });
const LoginContainer = connector(LoginApi);
export default LoginContainer;
export type LoginProps = ConnectedProps<typeof connector>;

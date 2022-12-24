import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginThunk } from "../../redux/reducers/auth-reducer/middleware";
import { testAccountData } from "../Login/Login";

const LoginButton = () => {
    const dispatch = useDispatch();
    const handleTestAccountClick = () => {
        // TODO add typed dispatch hook
        // @ts-ignore
        dispatch(loginThunk(testAccountData));
    };
    return (
        <div className="flex column">
            <NavLink
                style={{ marginBottom: "1rem" }}
                to="/login"
                className="add-butn"
            >
                Login / Auth
            </NavLink>
            <button
                onClick={handleTestAccountClick}
                className="add-butn whiteBg"
                style={{ marginTop: "0" }}
            >
                Test account
            </button>
        </div>
    );
};

export default LoginButton;

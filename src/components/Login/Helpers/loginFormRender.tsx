import { FormRenderProps } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Captcha } from "../Login";
import { FormValues } from "../LoginContainer";
import { useGetFields } from "./fields";
import ApiKeyModal from "../ApiKeyModal";

const REGISTRATION_LINK = "https://social-network.samuraijs.com/signUp";

export type ToggleModal = (isShown: boolean) => void;
type FormRenderFunction =
    | ((props: FormRenderProps<FormValues>) => React.ReactNode)
    | undefined;

export const loginFormRender =
    (loginFailed: string | null, captcha: Captcha): FormRenderFunction =>
    ({ handleSubmit, submitting, pristine, form }) => {
        const {
            captchaField,
            apiKeyField,
            emailField,
            passwordField,
            rememberMeField,
        } = useGetFields();
        const resetForm = () => form.reset();
        return (
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    {emailField}
                    {passwordField}
                </div>
                <ApiKeyModal apiKeyField={apiKeyField} />
                {loginFailed && loginFailed !== "" && (
                    <div className="loginError">{loginFailed}</div>
                )}
                {captcha.url && (
                    <div className="captcha">
                        <img src={captcha.url} alt="" />
                        {captchaField}
                    </div>
                )}
                <div className="flex between mt-20">
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="add-butn mr-20"
                        >
                            <span>Login</span>
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={submitting || pristine}
                            className="add-butn whiteBg"
                        >
                            <span>Reset</span>
                        </button>
                    </div>
                    <div className="additionalLinks">
                        <span>{rememberMeField}</span>
                        <a
                            className="registration-link"
                            target="_blank"
                            title=""
                            rel="noreferrer"
                            href={REGISTRATION_LINK}
                        >
                            Registration
                        </a>
                    </div>
                </div>
            </form>
        );
    };

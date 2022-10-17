import {FormRenderProps} from "react-final-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Captcha} from "../Login";
import {FormValues} from "../LoginContainer";
import {useGetFields} from "./fields";

const REGISTRATION_LINK = 'https://social-network.samuraijs.com/signUp'

export type ToggleModal = (isShown: boolean) => void

type FormRenderFunction = (
        (props: FormRenderProps<FormValues>) => React.ReactNode
) | undefined

export const loginFormRender = (
    setModalWindow: ToggleModal,
    loginFailed: string | null,
    captcha: Captcha
): FormRenderFunction =>
    ({handleSubmit, submitting, pristine, form}) => {
        const {
            captchaField, apiKeyField, emailField, passwordField, rememberMeField
        } = useGetFields()
        const openModal = () => setModalWindow(true)
        const resetForm = () => form.reset()
        return (
            <form onSubmit={handleSubmit}>
                {emailField}
                {passwordField}
                {apiKeyField}
                {loginFailed && loginFailed !== '' &&
                    <div className="loginError">{loginFailed}</div>
                }
                <div className="additionalLinks">
                    <span>
                        {rememberMeField}
                        <div onClick={openModal} className='apiKey'>
                            What is API-KEY
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                        </div>
                    </span>
                    <a
                        className="forgot-pwd underline"
                        target='_blank' title="" rel="noreferrer"
                        href={REGISTRATION_LINK}
                    >
                        Registration
                    </a>
                </div>
                {captcha.url &&
                    <div className='captcha'>
                        <img src={captcha.url} alt=""/>
                        {captchaField}
                    </div>
                }
                <div className="submit-btns">
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
            </form>
        )
    }

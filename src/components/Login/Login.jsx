import React from "react";
import {Form, Field} from "react-final-form"
import {isEmail, maxLengthCreator, minLengthCreator, required} from "../common/validators";
import {Input} from "../common/FormControl";

const Login = (props) => {
    let onSubmit = (formData) => {
        props.submitForm(formData)
    }
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    let maxLength40 = maxLengthCreator(40);
    let minLength8 = minLengthCreator(8);
    return <Form
        onSubmit={onSubmit}
        render={({handleSubmit, submitting, pristine, form}) => (
            <form onSubmit={handleSubmit}>
                <Field validate={composeValidators(required, maxLength40, isEmail)} name="email" inputType={'email'} label={'Email'} component={Input}/>
                <Field validate={composeValidators(required, minLength8, maxLength40)} name="password" inputType={'password'} label={'Password'} component={Input}/>
                {props.loginFailed !== '' ? <div className="loginError">{props.loginFailed}</div> : ''}
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/> Remember me
                <a className="forgot-pwd underline" title="" href="#">Forgot Password?</a>
                <div className="submit-btns">
                    <button type="submit" disabled={submitting} className="mtr-btn"><span>Login</span></button>
                    <button type="button" onClick={form.reset} disabled={submitting || pristine} className="mtr-btn"><span>Reset</span></button>
                </div>
            </form>
        )}
    />
}

export default Login;
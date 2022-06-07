import React, {useEffect, useState} from "react";
import {Form, Field} from "react-final-form"
import {isEmail, maxLengthCreator, minLengthCreator, required} from "../common/validators";
import {Input} from "../common/FormControl";
import {modifyHeaders} from "../redux/api";

const Login = ({ submitForm, loginFailed, captcha }) => {
    let [apiKey, setApiKey] = useState('');
    let onSubmit = (formData) => {
        submitForm(formData)
        setApiKey(formData.cookie)
    }
    useEffect(() => {
        localStorage.setItem('apiKey', apiKey);
        modifyHeaders()
    },[apiKey])
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
                <Field validate={composeValidators(minLength8)} name="cookie" inputType={'password'} label={'API-KEY'} component={Input}/>
                {loginFailed !== '' && <div className="loginError">{loginFailed}</div>}
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/> Remember me
                <a className="forgot-pwd underline" target='_blank' title="" href="https://social-network.samuraijs.com/signUp">Registration</a>
                { captcha ? <div className='captcha'>
                        <img src={captcha.url} alt=""/>
                        <Field name='captcha' label='Please enter captcha' component={Input} />
                    </div> : '' }
                <div className="submit-btns">
                    <button type="submit" disabled={submitting} className="mtr-btn"><span>Login</span></button>
                    <button type="button" onClick={form.reset} disabled={submitting || pristine} className="mtr-btn"><span>Reset</span></button>
                </div>
            </form>
        )}
    />
}

export default Login;
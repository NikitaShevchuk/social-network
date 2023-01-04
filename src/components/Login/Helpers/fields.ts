import { useMemo } from 'react';
import { createCheckBox, createInput } from '../../../common/helpers/createField';
import { isEmail, required } from '../../../common/helpers/validators';
import { maxLength40, minLength8 } from '../../../common/helpers/createValidators';

export const useGetFields = () =>
    useMemo(() => {
        const emailField = createInput(
            [required, maxLength40, isEmail],
            'email',
            'email',
            'Email*'
        );
        const passwordField = createInput(
            [required, maxLength40, minLength8],
            'password',
            'password',
            'Password*'
        );
        const apiKeyField = createInput([], 'password', 'cookie', 'API key (optional)');
        const rememberMeField = createCheckBox('rememberMe', 'Remember me');
        const captchaField = createInput([required], 'text', 'captcha', 'Please enter captcha');
        return {
            emailField,
            captchaField,
            apiKeyField,
            passwordField,
            rememberMeField
        };
    }, []);

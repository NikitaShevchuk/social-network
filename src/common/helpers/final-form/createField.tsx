import {composeValidators} from "./createValidators";
import {ValidatorType} from "./validators";
import {Input} from "../../commonComponents/FormControl/FormControl";
import {Field} from "react-final-form";
import React from "react";
import {FormApi} from "final-form";
import {NewMessageForm} from "../../../components/MainContent/Messages/NewMessage";

type InputTypes = 'password' | 'email' | 'text'

export const createInput = (
    validators: ValidatorType[],
    inputType: InputTypes,
    name: string,
    label?: string
) => (
    <Field
        validate={composeValidators(...validators)}
        name={name}
        inputType={inputType}
        label={label ? label : ''}
        component={Input}
    />
)

export const createCheckBox = (name: string, labelText: string) => (
    <>
        <Field
            name={name}
            initialValue={false}
            id={name}
            component='input'
            type='checkbox'
        />
        <label htmlFor={name} className='checkbox-label'>
            {labelText}
        </label>
    </>
)

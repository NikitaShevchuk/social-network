import { composeValidators } from "./createValidators";
import { ValidatorType } from "./validators";
import { Input } from "../FormControl/FormControl";
import { Field } from "react-final-form";
import React from "react";

type InputTypes = "password" | "email" | "text";

export const createInput = (
    validators: ValidatorType[],
    inputType: InputTypes = "text",
    name: string,
    label?: string
) => (
    <Field
        validate={composeValidators(...validators)}
        name={name}
        type={inputType}
        label={label ? label : null}
        component={Input}
    />
);

export const createCheckBox = (name: string, labelText: string | null) => (
    <>
        <Field name={name} id={name} component="input" type="checkbox" />
        {labelText && (
            <label htmlFor={name} className="checkbox-label">
                {labelText}
            </label>
        )}
    </>
);
export const createTextArea = (validators: ValidatorType[], name: string) => (
    <Field
        validate={composeValidators(...validators)}
        name={name}
        component="textarea"
    />
);
export const createHiddenInput = (name: string) => (
    <Field name={name} type="hidden" component="input" />
);
export const createFieldWithInitVal = (
    validators: ValidatorType[],
    name: string,
    key: number | string,
    initialValue: string
) => (
    <Field
        name={name}
        label={name}
        initialValue={initialValue}
        component={Input}
        validate={composeValidators(...validators)}
        key={key}
    />
);

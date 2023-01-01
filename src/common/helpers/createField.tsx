import { composeValidators } from "./createValidators";
import { ValidatorType } from "./validators";
import { Input } from "../FormControl/Input";
import { Field } from "react-final-form";
import React from "react";
import CheckBox from "../FormControl/CheckBox";

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

export interface LabelText {
    active: string;
    inactive: string;
}
export const createCheckBox = (name: string, labelText?: LabelText) => (
    <Field
        labelText={labelText}
        name={name}
        id={name}
        component={CheckBox}
        type="checkbox"
    />
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

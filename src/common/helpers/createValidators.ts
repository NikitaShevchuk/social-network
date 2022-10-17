import {maxLengthCreator, minLengthCreator, ValidatorType} from "./validators";

// Validators
type ComposeValidators = (...validators: ValidatorType[]) =>
    (value: string) => string | undefined

export const composeValidators: ComposeValidators = (...validators: ValidatorType[]) => (value: string) =>
    validators.reduce(
        (error: string | undefined, validator: ValidatorType) => {
            return error || validator(value)
        },
        undefined
    )
export const maxLength40: ValidatorType = maxLengthCreator(40);
export const minLength8: ValidatorType = minLengthCreator(8);
export const minLength4: ValidatorType = minLengthCreator(4);
export const maxLength20: ValidatorType = maxLengthCreator(20);
export const maxLength120: ValidatorType = maxLengthCreator(120);
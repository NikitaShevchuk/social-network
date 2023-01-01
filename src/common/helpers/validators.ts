export type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) =>
    value ? undefined : "Required";

export const isEmail: ValidatorType = (value) =>
    value.includes("@") ? undefined : "Please enter email";

export const maxLengthCreator =
    (maxLength: number): ValidatorType =>
    (value: string) => {
        const valueIsValid = value?.length <= maxLength;
        return valueIsValid ? undefined : `${maxLength} symbols max`;
    };

export const minLengthCreator =
    (minLength: number): ValidatorType =>
    (value: string) => {
        const valueIsValid = value?.length >= minLength;
        return valueIsValid ? undefined : `${minLength} symbols min`;
    };

export const isLink: ValidatorType = (value) => {
    const valueIsValid =
        (value !== null && value !== undefined && value.includes("https://")) ||
        value !== "";
    return valueIsValid ? undefined : "Please enter valid link";
};

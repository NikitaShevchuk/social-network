export const required = (value) => value ? undefined : 'Required';

export const isEmail = (value) => isNaN(value) && value.includes('@') ? undefined : 'Please enter email';

export const maxLengthCreator = (maxLength) => (value) => value && value.length <= maxLength ? undefined : `${maxLength} symbols max`;

export const minLengthCreator = (minLength) => (value) => value && value.length >= minLength ? undefined : `${minLength} symbols min`;
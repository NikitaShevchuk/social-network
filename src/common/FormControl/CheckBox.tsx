import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { LabelByState } from '../helpers/createField';

export interface CheckBoxProps extends FieldRenderProps<boolean, HTMLElement, string> {
    labelText?: string;
    labelByState: LabelByState;
}

const CheckBox = ({ labelText, input, labelByState }: CheckBoxProps) => {
    return (
        <div>
            {labelText && (
                <label htmlFor={input.name} className="checkbox-label">
                    {labelText}
                </label>
            )}
            {labelByState && (
                <label
                    htmlFor={input.name}
                    style={{
                        marginLeft: '5px',
                        marginRight: '5px'
                    }}
                    className="checkbox-label"
                >
                    {input.checked ? labelByState.active : labelByState.inactive}
                </label>
            )}
            <input {...input} id={input.name} />
        </div>
    );
};

export default CheckBox;

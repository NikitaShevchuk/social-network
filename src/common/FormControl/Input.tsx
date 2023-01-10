import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { FieldRenderProps } from 'react-final-form';
import style from './FormControl.module.scss';

interface Props extends FieldRenderProps<string, HTMLElement, string> {
    label: string | null;
    initialValue?: string;
}

export const Input = memo<Props>(({ meta, input, label }) => {
    const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);
    const onInputFocus = (e: React.FocusEvent<HTMLElement>) => {
        input.onFocus(e);
        setIsInputInFocus(true);
    };
    const onInputBlur = (e: React.FocusEvent<HTMLElement>) => {
        input.onBlur(e);
        setIsInputInFocus(false);
    };

    const hasError = meta.error && meta.touched;
    const labelClassName = meta.dirty || isInputInFocus || input?.value ? style.activeLabel : '';
    return (
        <div className="form-group">
            {label && (
                <label className={classNames('control-label', labelClassName)}>{label}</label>
            )}
            <input
                {...input}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className={classNames('border', hasError ? 'error' : '')}
            />
            {hasError && <div className={style.errorInfo}>{meta.error}</div>}
        </div>
    );
});

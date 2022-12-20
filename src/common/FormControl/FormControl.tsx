import React, {FC, useState} from "react";
import style from './FormControl.module.css';
import classNames from "classnames";

interface Props {
    meta: {
        error: string | undefined
        touched: boolean
        dirty: boolean
    }
    type: string
    input: any
    label: string | null
}

export const Input: FC<Props> = ({meta,type, input, label}) => {

    const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false)
    const onInputFocus = () => setIsInputInFocus(true)
    const onInputBlur = () => setIsInputInFocus(false)

    const hasError = meta.error && meta.touched
    const labelClassName = meta.dirty || isInputInFocus ? style.activeLabel : ''
    const iconClassName = hasError ? style.errorSelect : ''
    const activeBorder = meta.dirty ? style.activeBorder : ''
    const activeInput = meta.dirty ? style.activeInput : ''

    return (
        <div className="form-group">
            {label &&
                <label className={classNames('control-label', labelClassName)}>
                    {label}
                </label>
            }
            <input
                {...input}
                type={type}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className={classNames('border', activeInput)}
            />
            {hasError &&
                <div className={style.errorInfo}>
                    {meta.error}
                </div>
            }
            <i className={`mtrl-select ${iconClassName} ${activeBorder}`}/>
        </div>
    )
}

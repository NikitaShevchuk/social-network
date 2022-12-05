import React, {FC} from "react";
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

    const hasError = meta.error && meta.touched
    const labelClassName = meta.dirty ? style.activeLabel : ''
    const iconClassName = hasError ? style.errorSelect : ''
    const activeBorder = meta.dirty ? style.activeBorder : ''
    const activeInput = meta.dirty ? style.activeInput : ''

    return (
        <div className="form-group">
            <input
                {...input}
                type={type}
                className={classNames('border', activeInput)}
            />
            {hasError &&
                <div className={style.errorInfo}>
                    {meta.error}
                </div>
            }
            {label &&
                <label className={classNames('control-label', labelClassName)}>
                    {label}
                </label>
            }
            <i className={`mtrl-select ${iconClassName} ${activeBorder}`}/>
        </div>
    )
}

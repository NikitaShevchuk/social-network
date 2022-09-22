import React, {FC} from "react";
import style from './FormControl.module.css';

interface Props {
    meta: {
        error: string | undefined
        touched: boolean
        dirty: boolean
    }
    inputType: string
    input: any
    label: string
}

export const Input: FC<Props> = ({meta,inputType, input, label}) => {
    const hasError = meta.error && meta.touched
    return <div className="form-group">
        <input
            {...input}
            type={inputType}
            className={`${meta.dirty && style.activeInput}`}
        />
        {hasError &&
            <div className={style.errorInfo}>
                {meta.error}
            </div>
        }
        <label className={`control-label ${meta.dirty && style.activeLabel}`}>
            {label}
        </label>
        <i className={`mtrl-select ${hasError && style.errorSelect} ${meta.dirty && style.activeBorder} `}/>
    </div>
}

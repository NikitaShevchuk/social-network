import React from "react";
import style from './FormControl.module.css'

export const Input = (props) => {
    let hasError = props.meta.error && props.meta.touched;
    return <div className="form-group">
        <input {...props.input} type={props.inputType} className={`${props.meta.dirty && style.activeInput}`} />
        {hasError && <div className={`${style.errorInfo}`}>{props.meta.error}</div>}
        <label className={`control-label ${props.meta.dirty && style.activeLabel}`}>{props.label}</label>
        <i className={`mtrl-select ${hasError && style.errorSelect} ${props.meta.dirty && style.activeBorder} `}/>
    </div>

}
export const isSearchFieldEmpty = (e, form, requestFunc, ...args) => {
    let formValues = form.getState().values
    if (e.key === 'Backspace' && !formValues.searchBody) return requestFunc(...args)
}
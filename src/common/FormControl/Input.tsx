import React, { FC, useState } from "react";
import style from "./FormControl.module.scss";
import classNames from "classnames";

interface Props {
    meta: {
        error: string | undefined;
        touched: boolean;
        dirty: boolean;
    };
    input: any;
    label: string | null;
}

export const Input: FC<Props> = ({ meta, input, label }) => {
    const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);
    const onInputFocus = () => setIsInputInFocus(true);
    const onInputBlur = (e: React.FocusEvent) => {
        setIsInputInFocus(false);
        input.onBlur(e);
    };

    const hasError = meta.error && meta.touched;
    const labelClassName =
        meta.dirty || isInputInFocus || input?.value ? style.activeLabel : "";
    return (
        <div className="form-group">
            {label && (
                <label className={classNames("control-label", labelClassName)}>
                    {label}
                </label>
            )}
            <input
                {...input}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className={classNames("border", hasError ? "error" : "")}
            />
            {hasError && <div className={style.errorInfo}>{meta.error}</div>}
        </div>
    );
};

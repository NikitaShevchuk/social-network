import React, { FC } from "react";
import { LabelText } from "../helpers/createField";

interface Props {
    labelText?: string;
    textByState: LabelText;
    meta: {
        error: string | undefined;
        touched: boolean;
        dirty: boolean;
    };
    input: any;
}

const CheckBox: FC<Props> = ({ labelText, input, meta, textByState }) => {
    return (
        <div>
            {labelText && <label className="checkbox-label">{labelText}</label>}
        </div>
    );
};

export default CheckBox;

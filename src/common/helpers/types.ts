import { FieldRenderProps } from 'react-final-form';
import { LabelByState } from './createField';

export interface CheckBoxProps extends FieldRenderProps<boolean, HTMLElement, string> {
    labelText?: string;
    labelByState: LabelByState;
}

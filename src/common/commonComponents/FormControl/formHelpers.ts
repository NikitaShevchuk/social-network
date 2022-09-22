import {FormApi} from "final-form";
import {SearchDialogsFormValues} from "../../../components/MainContent/Messages/Dialogs/DialogsSearchForm";

export const isSearchFieldEmpty = (
    e: KeyboardEvent,
    form: FormApi<SearchDialogsFormValues>,
    requestFunc: any,
    ...args: any
) => {
    const formValues = form.getState().values as SearchDialogsFormValues
    if (e.key === 'Backspace' && !formValues.searchBody) return requestFunc(...args)
}
import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Field, Form} from "react-final-form";
import {required} from "../../../../common/helpers/validators";
import {isSearchFieldEmpty} from "../../../../common/FormControl/formHelpers";
import {FormApi} from "final-form";
import {useParams} from "react-router-dom";

interface Props {
    setDialogs: (id: number) => void
    filterDialogs: (userName: string) => void
}

export interface SearchDialogsFormValues {
    searchBody: string
}

const DialogsSearchForm: FC<Props> = ({filterDialogs, setDialogs}) => {
    const userId = Number(useParams().userId);
    const dialogsSearch = (formData: any) => {
        filterDialogs(formData.searchBody)
    }
    const handleKeyUp = (e: KeyboardEvent, form: FormApi<SearchDialogsFormValues>) => {
        isSearchFieldEmpty(e, form, setDialogs, userId)
        form.submit()
    }
    return (
        <div className="search-users pointer">
            <FontAwesomeIcon icon={faSearch} />
            <Form
                onSubmit={dialogsSearch}
                render={
                    ({handleSubmit, form}) => (
                        <form onSubmit={handleSubmit}>
                            <Field
                                name='searchBody'
                                autoFocus validate={required}
                                onKeyUp={(e: KeyboardEvent) => handleKeyUp(e, form)}
                                component='input'
                                placeholder='Find dialog by name'
                                className="search-users__input"
                            />
                        </form>
                    )}
            />
        </div>
    );
};

export default DialogsSearchForm;
import React, {memo} from 'react';
import {Field} from "react-final-form";
import {required} from "../../common/helpers/validators";
import {isSearchFieldEmpty} from "../../common/FormControl/formHelpers";
import {FormApi} from "final-form";
import {SearchDialogsFormValues} from "../../components/MainContent/Messages/Dialogs/DialogsSearchForm";
import debounce from 'lodash.debounce';

type GetUsersFuncType = (currentPage: number, pageSize: number) => Promise<void>

interface Props {
    handleSubmit: () => void
    form: FormApi<SearchDialogsFormValues>
    getUsers: GetUsersFuncType
    pageSize: number
}

const SearchFrom = memo<Props>(({handleSubmit, form, getUsers, pageSize}) => {
    const getUsersWithDebounce = React.useCallback( 
        debounce((currentPage: number, pageSize: number) => {getUsers(currentPage, pageSize)}, 300),
    [])
    const keyUpHandler = (e: KeyboardEvent) => {
        isSearchFieldEmpty(e, form, getUsersWithDebounce, 1, pageSize)
        form.submit()
    }
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name='searchBody'
                autoFocus
                validate={required}
                onKeyUp={keyUpHandler}
                component='input'
                placeholder='Search users'
                className="search-users__input"
            />
        </form>
    );
});

export default SearchFrom;
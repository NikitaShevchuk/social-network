import React, {FC, memo} from "react";
import Preloader from "../../../common/Preloader/Preloader";
import {Form} from "react-final-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {UsersConnectedProps} from "./UsersContainer";
import SearchFrom from "./SearchFrom";

export interface UsersProps extends UsersConnectedProps {
    loadUsers: (e: React.UIEvent<HTMLDivElement>) => void
    searchSubmit: (formData: any) => void
    setSearchMode?: (searchMode: boolean) => void
    getDialog?: (id: number) => void
}

const Users: FC<UsersProps> = (props) => {
    if (!props.users[0]) return <Preloader/>
    return (
        <div className='users__wrapper'>
            <div className="search-users">
                <FontAwesomeIcon icon={faSearch}/>
                <Form
                    onSubmit={props.searchSubmit}
                    render={
                        ({handleSubmit, form}) => (
                            <SearchFrom
                                handleSubmit={handleSubmit}
                                form={form}
                                getUsers={props.getUsers}
                                pageSize={props.pageSize}
                            />
                        )}
                />
            </div>
            <div className="nearby-contct" onWheel={props.loadUsers}>
                {props.users}
                {props.isFetching ? <Preloader/> : null}
            </div>
        </div>
    )
}

export default memo(Users);
import React, {FC, memo} from "react";
import {Form} from "react-final-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {UsersConnectedProps} from "./UsersContainer";
import SearchFrom from "./SearchFrom";
import MultiplyPreloader from "../../preloaders";
import UsersPreloader from "../../preloaders/UsersPreloader";
import FetchError from "../../common/FetchError";
import NoData from "../../common/NoData";
import Preloader from "../../preloaders/Preloader";

export interface UsersProps extends UsersConnectedProps {
    loadUsers: (e: React.UIEvent<HTMLDivElement>) => void
    searchSubmit: (formData: any) => void
    setSearchMode?: (searchMode: boolean) => void
    getDialog?: (id: number) => void
}

const Users: FC<UsersProps> = (props) => {
    const refetchUsers = () => props.getUsers(1, props.pageSize)
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

                {/* Error */}
                {props.usersError &&
                    <FetchError refetch={refetchUsers} errorText={props.usersError} />
                }

                {/* No data */}
                {!props.users[0] && !props.isLoading &&
                    <NoData text='There is no users yet' linkText='' href='' />
                }

                {/* Is loading */}
                <MultiplyPreloader itemsNumber={10} isLoading={props.isLoading}>
                    <UsersPreloader />
                </MultiplyPreloader>

                {/* Show users */}
                {!props.usersError && props.users}

                {/* Is fetching */}
                {props.isFetching && <Preloader />}

            </div>
        </div>
    )
}

export default memo(Users);
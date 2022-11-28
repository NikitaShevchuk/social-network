import React, {FC, memo, WheelEventHandler} from "react";
import {Form} from "react-final-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {UsersContainerProps} from "./UsersContainer";
import SearchFrom from "./SearchFrom";
import MultiplyPreloader from "../../preloaders";
import UsersPreloader from "../../preloaders/UsersPreloader";
import FetchError from "../../common/FetchError";
import NoData from "../../common/NoData";
import Preloader from "../../preloaders/Preloader";
import { User } from "../../types/UsersTypes";
import SingleUser from "./SingleUser";
import PerfectScrollbar from "react-perfect-scrollbar";

export interface UsersProps extends UsersContainerProps {
    loadUsers: (e: React.UIEvent<HTMLDivElement>) => void
    searchSubmit: (formData: any) => void
    setSearchMode?: (searchMode: boolean) => void
}

const Users: FC<UsersProps> = (props) => {
    const refetchUsers = () => props.getUsers(1, props.pageSize)
    return (
        <>
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
            <PerfectScrollbar
                className="nearby-contct"
                onWheel={props.loadUsers as unknown as WheelEventHandler<HTMLElement>}
            >
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
                {!props.usersError && props.users.map((user: User) => (
                    <SingleUser
                        user={user}
                        startDialogOnClick={props.startDialogOnClick}
                        getDialog={props.getDialog}
                        disableWhileRequest={props.disabledButtons}
                        key={user.id}
                    />
                ))}
                {/* Is ftching */}
                {props.isFetching && <Preloader />}
            </PerfectScrollbar>
        </>
    )
}

export default memo(Users);
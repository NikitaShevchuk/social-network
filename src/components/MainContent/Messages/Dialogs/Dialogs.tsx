import React, {FC, useState} from "react";
import UsersContainer from "../../../../features/Users/UsersContainer";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../../redux/redux-store";
import {filterDialogs, getDialog, setDialogs} from "../../../../redux/reducers/messagesReducer/middleware";
import SidebarHeader from "./SidebarHeader";
import DialogsSearchForm from "./DialogsSearchForm";
import DialogsList from "../../../../features/DialogsList";

const Dialogs: FC<DialogsConnectedProps> = ({
    filterDialogs, getDialog
}) => {
    const [searchMode, setSearchMode] = useState(false);
    return (
        <ul className="peoples">
            <SidebarHeader
                searchMode={searchMode}
                setSearchMode={setSearchMode}
            />
            <div className={searchMode ? 'shown' : 'hidden'}>
                <UsersContainer
                    setSearchMode={setSearchMode}
                    getDialog={getDialog}
                />
            </div>
            <div className={!searchMode ? 'shown' : 'hidden'}>
                <DialogsSearchForm
                    setDialogs={setDialogs}
                    filterDialogs={filterDialogs}
                />
                <div className="dialogs-list">
                    <DialogsList />
                </div>
            </div>
        </ul>
    )
}

const mapStateToProps = (state: RootState) => ({

})

const connector = connect(
    mapStateToProps,
    {getDialog, filterDialogs}
)

export default connector(Dialogs)
export type DialogsConnectedProps = ConnectedProps<typeof connector>
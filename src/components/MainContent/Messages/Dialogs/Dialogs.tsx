import React, {FC, useState} from "react";
import UsersContainer from "../../Users/UsersContainer";
import Preloader from "../../../../common/Preloader/Preloader";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../../redux/redux-store";
import {dialogsReselect} from "../../../../redux/selectors/messagesSelector";
import {filterDialogs, getDialog, setDialogs} from "../../../../redux/Reducers/messagesReducer/middleware";
import SidebarHeader from "./SidebarHeader";
import DialogsSearchForm from "./DialogsSearchForm";

const Dialogs: FC<DialogsConnectedProps> = ({
    dialogs, setDialogs, filterDialogs, getDialog
}) => {
    const [searchMode, setSearchMode] = useState(false);
    return (
        <ul className="peoples">
            <SidebarHeader
                searchMode={searchMode}
                setSearchMode={setSearchMode}
            />
            {searchMode &&
                <UsersContainer
                    setSearchMode={setSearchMode}
                    getDialog={getDialog}
                />
            }
            {!searchMode && <>
                <DialogsSearchForm
                    setDialogs={setDialogs}
                    filterDialogs={filterDialogs}
                />
                {dialogs[0]
                    ? dialogs
                    : <Preloader/>
                }
            </>}
        </ul>
    )
}

const mapStateToProps = (state: RootState) => ({
    dialogs: dialogsReselect(state)
})

const connector = connect(
    mapStateToProps,
    {setDialogs, getDialog, filterDialogs}
)

export default connector(Dialogs)
export type DialogsConnectedProps = ConnectedProps<typeof connector>
import React, {FC, useEffect} from 'react';
import {RootState} from "../../redux/redux-store";
import {dialogsReselect} from "../../redux/selectors/messagesSelector";
import {connect, ConnectedProps} from "react-redux";
import {setDialogs} from "../../redux/reducers/dialogs-reducer/middleware";
import {getIsAuthorized} from "../../redux/selectors/authSelectors";
import NoData from "../../common/NoData";
import FetchError from "../../common/FetchError";
import DialogsPreloader from "../../preloaders/DialogsPreloader";
import MultiplyPreloader from "../../preloaders";
import LoginButton from "../../components/Buttons/LoginButton";
import PerfectScrollbar from 'react-perfect-scrollbar'

interface Props extends DialogsListConnectedProps {
    className?: string
}

const DialogsList: FC<Props> = ({
    dialogs, setDialogs, isAuthorized,
    dialogsIsLoading, dialogsError, className
}) => {
    useEffect(() => {
        if(isAuthorized) setDialogs()
    }, [isAuthorized])
    if (!isAuthorized) return (
        <div className="notAuthorized">
            <span className="text">Authorize to see messages</span>
            <LoginButton />
        </div>
    )
    return (
        <PerfectScrollbar
            component='ul'
            className={`peoples ${className ? className : ''}`}
        >
            {/* Error */}
            {dialogsError && !dialogsIsLoading &&
                <FetchError
                    refetch={setDialogs}
                    errorText="Can't load dialogs"
                />
            }

            {/* Is loading */}
            <MultiplyPreloader
                itemsNumber={7}
                isLoading={dialogsIsLoading}
            >
                <DialogsPreloader />
            </MultiplyPreloader>

            {/* No dialogs */}
            {!dialogs[0] && !dialogsIsLoading && !dialogsError &&
                <NoData
                    text='You do not have any messages yet'
                    linkText='Start new dialog'
                    href='/messages'
                />
            }

            {/* Show dialogs */}
            {!dialogsIsLoading && !dialogsError && dialogs}
        </PerfectScrollbar>
    )
}

const mapStateToProps = (state: RootState) => ({
    dialogs: dialogsReselect(state),
    isAuthorized: getIsAuthorized(state),
    dialogsIsLoading: state.dialogsPage.dialogsIsLoading,
    dialogsError: state.dialogsPage.dialogsError
})
const connector = connect(mapStateToProps, {setDialogs})
export default connector(DialogsList);
type DialogsListConnectedProps = ConnectedProps<typeof connector>
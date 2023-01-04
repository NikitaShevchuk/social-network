import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import UsersContainer from '../../../../features/Users/UsersContainer';
import { filterDialogs, setDialogs } from '../../../../redux/reducers/dialogs-reducer/middleware';
import SidebarHeader from './SidebarHeader';
import DialogsSearchForm from './DialogsSearchForm';
import DialogsList from '../../../../features/DialogsList';

const Dialogs: FC<DialogsConnectedProps> = ({ filterDialogs, setDialogs }) => {
    const [searchMode, setSearchMode] = useState(false);
    return (
        <ul className="peoples">
            <SidebarHeader searchMode={searchMode} setSearchMode={setSearchMode} />
            <div className={searchMode ? 'shown' : 'hidden'}>
                <UsersContainer setSearchMode={setSearchMode} startDialogOnClick />
            </div>
            <div className={!searchMode ? 'shown' : 'hidden'}>
                <DialogsSearchForm setDialogs={setDialogs} filterDialogs={filterDialogs} />
                <DialogsList className="messages-page-dialogs" />
            </div>
        </ul>
    );
};

const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, { filterDialogs, setDialogs });

export default connector(Dialogs);
export type DialogsConnectedProps = ConnectedProps<typeof connector>;

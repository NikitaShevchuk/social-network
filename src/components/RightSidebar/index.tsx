import React from 'react';
import { Link } from 'react-router-dom';
import DialogsList from '../../features/DialogsList';

const RightSidebar = () => {
    return (
        <aside className="sidebar right static">
            <div className="widget__wrapper">
                <div className="sidebarHeader">Last messages</div>
                <DialogsList />
                <Link to="/messages" className="dialog-header link see-all">
                    See all
                </Link>
            </div>
        </aside>
    );
};

export default RightSidebar;

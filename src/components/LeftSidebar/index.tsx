import React, { FC, memo } from 'react';
import Menu from './Widgets/Menu';
import UserNavContainer from './Widgets/UserNav/UserNavContainer';

const LeftSidebar: FC = memo(() => (
    <aside className="sidebar left static">
        <div className="widget">
            <Menu />
            <UserNavContainer />
        </div>
    </aside>
));

export default LeftSidebar;

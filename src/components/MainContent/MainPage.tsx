import React, {FC} from 'react';
import UsersContainer from "../../features/Users/UsersContainer";

const MainPage: FC = () => {
    return <div className="central-meta">
        <UsersContainer startDialogOnClick={false} />
    </div>
};

export default MainPage;
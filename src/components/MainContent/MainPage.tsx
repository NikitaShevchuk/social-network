import React, {FC} from 'react';
import UsersContainer from "../../features/Users/UsersContainer";

const MainPage: FC = () => {
    return <div className="central-meta">
        <UsersContainer />
    </div>
};

export default MainPage;
import React, {FC} from 'react';
import UsersContainer from "./Users/UsersContainer";

const MainPage: FC = () => {
    return <div className="central-meta">
        <UsersContainer />
    </div>
};

export default MainPage;
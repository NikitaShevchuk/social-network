import React, {FC, memo} from "react";
import Menu from "./Widgets/Menu";
import UserNavContainer from "./Widgets/UserNav/UserNavContainer";


const LeftSidebar: FC = memo(() => {
    return <aside className="sidebar static">
        <div className="widget">
            <Menu />
            <UserNavContainer  />
        </div>
    </aside>
})

export default LeftSidebar

import React, {FC} from "react";
import LastMessages from "./Widgets/LastMessages";
import {connect, ConnectedProps} from "react-redux";
import {dialogsReselect} from "../../redux/selectors/messagesSelector";
import {setDialogs} from "../../redux/Reducers/messagesReducer/middleware";

const RightSidebar: FC<RightSidebarProps> = (props) => {
    return <aside className="sidebar static">
        <div className="sidebarHeader">Last messages</div>
        <div className="widget">
            <LastMessages {...props}/>
        </div>
    </aside>
}

let mapStateToProps = (state: any) => ({
    isAuthorized: state.auth.isAuthorized,
    dialogs: dialogsReselect(state),
    myId: state.auth.myId
})

const connector = connect(mapStateToProps, {setDialogs})

export default connector(RightSidebar);

export type RightSidebarProps = ConnectedProps<typeof connector>
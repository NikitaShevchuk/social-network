import React from "react";
import LastMessages from "./Widgets/LastMessages";
import {connect} from "react-redux";
import {dialogsReselect} from "../MainContent/Messages/messagesSelector";
import {setDialogs} from "../redux/messagesPageReducer";

const RightSidebar = (props) => {
    return <aside className="sidebar static">
        <div className="sidebarHeader">Last messages</div>
        <div className="widget">
            <LastMessages {...props}/>
        </div>
    </aside>
}

let mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    dialogs: dialogsReselect(state),
    myId: state.auth.myId
})

export default connect(mapStateToProps, {setDialogs})(RightSidebar);
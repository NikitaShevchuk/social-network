import React from "react";

class ProfileStatus extends React.Component {
    state = {
        status: this.props.status,
        editMode: false
    }

    enterEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    exitEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updStatusThunk(this.state.status);
    }
    changeStatusText = (e) => {
        this.setState({
            status: e.target.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({status: this.props.status})
        }
    }
    render() {
        if (this.state.editMode) {
            return <input type="text" onChange={this.changeStatusText} onBlur={this.exitEditMode} value={
                this.state.status === null ?
                    'Add your status' :
                    this.state.status
            }/>
        }
        return <span onClick={this.enterEditMode}>{
            this.props.status === null || this.props.status === '' ?
                'Add your status' :
                this.props.status
        }</span>
    }

}

export default ProfileStatus;
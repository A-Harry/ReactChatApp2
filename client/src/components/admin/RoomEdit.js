import React from "react";
import axios from "axios";
import { Modal } from "reactstrap";

const react_api = process.env.REACT_APP_API

class RoomEdit extends React.Component {
    constructor(props) {
        super(props)

        const room = props.room
        this.state = {
            roomName: room.name,
            status: room.status
        }
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    handleSubmit(e) {
        const { roomName, status } = this.state
        const roomID = this.props.room._id
        const obj = {
            roomID,
            roomName,
            status
        }
        const updateText = document.getElementById("feedback")
        e.preventDefault()
        axios.post(`${react_api}/api/rooms/${roomID}`, obj).then(res => {
            console.log(res)
            updateText.innerHTML = res.data
            setTimeout(() => {
                updateText.innerHTML = ""
            }, 3000);
        })
    }

    handleName(e) {
        const name = e.target.value
        this.setState({
            roomName: name
        })
    }
    handleStatus(e) {
        const newStatus = e.target.value
        this.setState({
            status: newStatus
        })
    }

    onClose(e) {
        e.preventDefault()
        this.props.onClose(e.target.value)
    }

    render() {
        const { roomName, status } = this.state
        return (
            <div>
                <Modal isOpen={true}>
                    <form className="roomEditForm" onSubmit={this.handleSubmit}>
                        <button class="btnClose" value="editClose" onClick={this.onClose}>Close</button>
                        <label id="lblEdit">Edit Room</label>
                        <label id="lblRoom">Room Name:</label>
                        <input id="inpRoom" placeholder="Enter Room name" value={roomName} onChange={this.handleName}></input>
                        <label id="lblStatus">Status:</label>
                        <select id="optStatus" value={status} onChange={this.handleStatus}>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <button id="btnUpdate" type="submit">Update room</button>
                        <p id="feedback"></p>
                    </form>
                </Modal>
            </div>
        )
    }

}
export default RoomEdit;
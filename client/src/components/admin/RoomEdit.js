import React from "react";
import axios from "axios";

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
        axios.post(`http://localhost:4000/api/rooms/${roomID}`, obj).then(res => {
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
                <form className="roomEditForm" onSubmit={this.handleSubmit}>
                <button value="editClose" onClick={this.onClose}>Close</button>
                <br></br>
                    <label>Room Name:</label>
                    <input placeholder="Enter Room name" value={roomName} onChange={this.handleName}></input>
                    <select value={status} onChange={this.handleStatus}>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <button type="submit">Update room</button>
                    <p id="feedback"></p>
                </form>
            </div>
        )
    }

}
export default RoomEdit;
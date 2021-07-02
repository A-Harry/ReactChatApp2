import React from "react"
import axios from "axios"

class RoomAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: '',
            status: 'Active'
        }

        this.handleStatus = this.handleStatus.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        const obj = {
            name: this.state.roomName,
            status: this.state.status
        }
        axios.post("http://localhost:4000/api/rooms/add", obj)
    }

    handleName(e) {
        const room_name = e.target.value;
        this.setState({
            roomName: room_name
        })
    }

    handleStatus(e) {
        const roomStatus = e.target.value;
        this.setState({
            status: roomStatus
        })
    }

    onClose(e) {
        e.preventDefault()
        this.props.onClose(e.target.value)
    }

    render() {
        return (
            <div>
                <form className="roomAddForm" onSubmit={this.handleSubmit}>
                    <button value="addClose" onClick={this.onClose}>Close</button>
                    <br></br>
                    <label> Room Name: </label>
                    <input placeholder="enter a room name" onChange={this.handleName} required></input>
                    <label> Status </label>
                    <select onChange={this.handleStatus}>
                        <option> Active </option>
                        <option> Inactive </option>
                    </select>
                    <button type="submit">Add room</button>
                </form>
                <p id="feedback"></p>
            </div>
        )
    }
}

export default RoomAdd
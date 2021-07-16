import React from "react"
import axios from "axios"
import { Modal } from "reactstrap"

const react_api = process.env.REACT_APP_API

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
        const feedback = document.getElementById("feedback")
        axios.post(`${react_api}/api/rooms/add`, obj).then((res)=>{
            console.log(res);
            feedback.innerHTML=res.data
            setTimeout(() => {
                feedback.innerHTML= ""
            }, 3000)
        })
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
                <Modal isOpen={true}>
                    <form className="roomAddForm" onSubmit={this.handleSubmit}>
                        <button className="btnClose" value="addClose" onClick={this.onClose}>Close</button>
                        <label id="lblAdd">Add a room</label>
                        <label id="lblRoom"> Room Name: </label>
                        <input id="inpRoom" placeholder="enter a room name" onChange={this.handleName} required></input>
                        <label id="lblStatus"> Status: </label>
                        <select id="optStatus" onChange={this.handleStatus}>
                            <option> Active </option>
                            <option> Inactive </option>
                        </select>
                        <button id="btnAdd" type="submit">Add room</button>
                        <p id="feedback"></p>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default RoomAdd
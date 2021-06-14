import React, { Component } from "react"
import axios from "axios";
import RoomAdd from "./RoomAdd";
import RoomEdit from "./RoomEdit";
import moment from "moment";

const Rooms = (props) => {
    const room = props.room

   function handleClick(e){
        e.preventDefault()
        props.onEdit(room._id)
    }

    return (
        <tr>
            <td>{room.name}</td>
            <td>{room.status}</td>
            <td>{moment(room.createdAt).format("MMMM DD YYYY hh:mm:ss a")}</td>
            <td>{moment(room.updatedAt).format("MMMM DD YYYY hh:mm:ss a")}</td>
            <td><button onClick={handleClick}> Edit Room </button></td>
            <td><button>Delete Room</button></td>
        </tr>
    )
}

export default class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/rooms').then((room) => {
            this.setState({
                rooms: room.data
            })
        })
    }


    displayRoomList() {
        return (
            this.state.rooms.map((room) => {
                return (
                    <Rooms key={room._id} room={room} onEdit={this.onEdit} />
                )
            })
        )
    }

    onEdit = (id) => {
        axios.get(`http://localhost:4000/api/rooms/${id}`).then((res)=>{

            console.log(res)
        })
    }

    render() {
        return (
            <div className="Rooms">
                <h2>Rooms</h2>
                <table id="tblRoom" className="log-data">
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Status</th>
                            <th>Creation Date</th>
                            <th>Last Edit Date</th>
                            <button>Add Room</button>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayRoomList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
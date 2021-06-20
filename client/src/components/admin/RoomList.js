import React, { Component } from "react"
import axios from "axios";
import RoomAdd from "./RoomAdd";
import RoomEdit from "./RoomEdit";
import moment from "moment";

const Rooms = (props) => {
    const room = props.room

   function handleClick(e){
        e.preventDefault()
        if(e.target.value == "edit"){
            props.onEdit(room._id)
        }
        if(e.target.value == "delete"){
            props.onDelete(room._id)
        }
    }

    return (
        <tr>
            <td>{room.name}</td>
            <td>{room.status}</td>
            <td>{moment(room.createdAt).format("MMMM DD YYYY hh:mm:ss a")}</td>
            <td>{moment(room.updatedAt).format("MMMM DD YYYY hh:mm:ss a")}</td>
            <td><button onClick={handleClick} value="edit"> Edit Room </button></td>
            <td><button onClick={handleClick} value="delete">Delete Room</button></td>
        </tr>
    )
}

export default class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: [],
            edit: false,
            add: false,
            selectedRoom:''
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

    onEdit = async (id) => {
        var name;
        await axios.get(`http://localhost:4000/api/rooms/${id}`).then((res)=>{
            name = res.data
            console.log(res.data)
        })
        this.setState({
            selectedRoom: name,
            edit: !this.state.edit
        })
    }

    handleEdit(data){
        const {roomID, roomName, status} = data
        console.log(roomName, status, roomID)
        const obj = {
            roomID,
            roomName,
            status
        }
        axios.post(`http://localhost:4000/api/rooms/${roomID}`, obj).then( res =>{
            console.log(res)
            const updateText = document.getElementById("update")
            updateText.innerHTML = "Room Updated"
            setTimeout(() => {
                updateText.innerHTML = ""
            }, 3000);

        });
    }

    showAddform =() =>{
        this.setState({
            add: !this.state.add
        })
    }

    render() {
        const {edit, add, selectedRoom} = this.state
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
                            <button onClick={this.showAddform}>Add Room</button>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayRoomList()}
                    </tbody>
                </table>
                {edit && <RoomEdit room={selectedRoom}/>}
                {add && <RoomAdd/>}
            </div>
        )
    }
}
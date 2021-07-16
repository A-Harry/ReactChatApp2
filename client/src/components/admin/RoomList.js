import React, { Component } from "react"
import axios from "axios";
import RoomAdd from "./RoomAdd";
import RoomEdit from "./RoomEdit";
import moment from "moment";

const react_api = process.env.REACT_APP_API;

const Rooms = (props) => {
    const room = props.room

   function handleClick(e){
        e.preventDefault()
        if(e.target.value === "edit"){
            props.onEdit(room._id)
        }
        if(e.target.value === "delete"){
            props.onDelete(room._id)
        }
    }

    return (
        <tr>
            <td>{room._id}</td>
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
            showEdit: false,
            showAdd: false,
            selectedRoom:''
        }
    }

    componentDidMount() {
        axios.get(`${react_api}/api/rooms`).then((room) => {
            this.setState({
                rooms: room.data
            })
        })
    }

    componentDidUpdate(){
        axios.get(`${react_api}/api/rooms`).then((room) => {
            this.setState({
                rooms: room.data
            })
        })
    }


    displayRoomList() {
        return (
            this.state.rooms.map((room) => {
                return (
                    <Rooms key={room._id} room={room} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                )
            })
        )
    }

    handleEdit = async (id) => {
        var name;
        await axios.get(`${react_api}/api/rooms/${id}`).then((res)=>{
            name = res.data
            console.log(res.data)
        });

        this.setState({
            selectedRoom: name,
            showEdit: true
        });

        if(this.state.showAdd){
            this.handleClose("addClose");
        }
    }

    handleDelete = async (id) =>{
        var name;
        await axios.get(`${react_api}/api/rooms/${id}`).then((res)=>{
            name = res.data.name
            console.log(res.data)
        })
        if (window.confirm(`Are you sure you want to delete room: ${name}? \n( id: ${id})`)){
            axios.delete(`${react_api}/api/rooms/delete/${id}`)
        }
    }

    showAddform =() =>{
        this.setState({
            showAdd: true
        })
        if (this.state.showEdit){
            this.handleClose("editClose")
        }

    }

    handleClose = (val) =>{
        if(val === "addClose"){
            this.setState({
                showAdd:false
            })
        }
        else if(val === "editClose"){
            this.setState({
                showEdit: false
            })
        }
    }

    render() {
        const {showEdit, showAdd, selectedRoom} = this.state
        return (
            <div className="Rooms">
                
                <h2>Rooms</h2>
                <div className="tblContainer">
                <table id="tblRoom" className="log-data">
                    <thead>
                        <tr>
                            <th>Room ID</th>
                            <th>Room Name</th>
                            <th>Status</th>
                            <th>Creation Date</th>
                            <th>Last Edit Date</th>
                            <th><button onClick={this.showAddform}>Add Room</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayRoomList()}
                    </tbody>
                </table>
                </div>
                {showEdit && <RoomEdit room={selectedRoom} onClose={this.handleClose}/>}
                {showAdd && <RoomAdd onClose={this.handleClose}/>}
            </div>
        )
    }
}
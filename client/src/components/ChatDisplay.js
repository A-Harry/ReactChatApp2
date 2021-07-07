import React from "react"
import io from "socket.io-client"
import Rooms from "./Rooms.js"
import axios from "axios"
import { Container, Form, FormGroup } from "reactstrap"
import "../assets/styles.css"
export default class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.history = this.props.history;
        this.location = this.props.location;
        this.state = {
            username: this.location.state ? this.location.state.username : "anonymous",
            messages: [],
            input: '',
            room: 'general',
            rooms: [{name: 'general', status: "Active"}],
            chat: this.location.state ? this.location.state.chat : "",
        }
    }
    
    async componentDidMount() {
        // this.socket.join(this.state.room)
        this.socket = io("localhost:4000");
        console.log(this.socket)

        // if ((this.state.username !== this.props.username) && (this.props.username !== "")) {
        //     await this.setState({
        //         username: this.props.username
        //     })
        //     console.log(this.state.username)
        // }

        if (this.state.username !== "anonymous" ) {
            this.socket.emit("change_username", { username: this.state.username })
        }

        this.socket.on("new_message", msg => {
            console.log("new message")
            this.onReceivedMessage(msg)
        })
        this.socket.on("update_self", (msg) =>{
            this.onReceivedMessage(msg)
        })
        
        const roomlist = await axios.get("http://localhost:4000/api/rooms")
        console.log(roomlist.data)
        this.setState({
            rooms: [...this.state.rooms.concat(roomlist.data)]
        })
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    onInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    //send message to server
    newMessage = (event) => {
        event.preventDefault();
        this.socket.emit("new_message", { username: this.state.username, message: this.state.input })
    }

    //when receiving message
    onReceivedMessage = (msg) => {
        this.setState({
            messages: [...this.state.messages, msg]
        })
    }

    onChangeRoom = (room) => {
        if (this.state.room !== room.target.value) {
            this.socket.emit("change_room", room.target.value)
            this.setState({
                room: room.target.value
            })
        }
    }

    returnHome = (e) =>{
        this.history.push("/")
        this.socket.disconnect()
    }

    render() {
        const { rooms } = this.state
        let roomNames = []
        rooms.forEach(element => {
            roomNames.push(element)
        });

        const currentRoom = this.state.room;
        
        return (
            <div>
                <Container >
                <h1>ReactChat</h1>
                <span className="subHeading">
                    <label id="current-room">Current Room: {currentRoom} </label>
                    <button id="home" onClick={this.returnHome}>Return to home </button>
                </span>
                </Container>
                <Container className= "chat-container" fluid="lg">
                    <section className="chatbox">
                        <section className="roomContainer">
                            <Rooms rooms={roomNames} onChangeRoom={this.onChangeRoom} />
                        </section>
                        <section className="chat">
                            {this.state.messages.map((msg) => {
                                return <p id="message">{msg.username}: {msg.message}</p>
                            })}
                        </section>
                    </section>
                    <form onSubmit={this.newMessage}>
                        <input className="inputTxt" onChange={this.onInput}></input>
                        <button type="submit">Send</button>
                    </form>
                </Container>
            </div>
        )
    }
}
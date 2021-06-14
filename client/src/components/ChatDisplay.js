import React from "react"
import io from "socket.io-client"
import Rooms from "./Rooms.js"
export default class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "anonymous",
            messages: [],
            input: '',
            room: 'general',
            rooms: [
                "general", "movies", "school"
            ],
            chat: this.props.chat
        }
    }
    
    async componentDidMount() {
        // this.socket.join(this.state.room)
        this.socket = io("localhost:4000");
        console.log(this.socket)
        if ((this.state.username != this.props.username) && (this.props.username != "")) {
            await this.setState({
                username: this.props.username
            })
            console.log(this.state.username)
        }

        if (this.state.username != "anonymous" ) {
            this.socket.emit("change_username", { username: this.state.username })
        }

        this.socket.on("new_message", msg => {
            console.log("new message")
            this.onReceivedMessage(msg)
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
        let arr = this.state.messages;
        this.setState({
            messages: [...this.state.messages, msg]
        })
    }

    onChangeRoom = (room) => {
        if (this.state.room != room.target.value) {
            this.socket.emit("change_room", room.target.value)
            this.setState({
                room: room.target.value
            })
        }
    }

    returnHome = (e) =>{
        this.setState({
            chat:false
        })
        this.socket.disconnect()
    }

    render() {
        const { rooms } = this.state
        let roomNames = []
        rooms.forEach(element => {
            roomNames.push(element)
        });

        return (
            <div>
                <h1>ReactChat</h1>
                <Rooms rooms={roomNames} onChangeRoom={this.onChangeRoom} />
                <button id="home" onClick={this.returnHome}>Return to home </button>
                <section className="chatbox">
                    {this.state.messages.map((msg) => {
                        return <h1>{msg.username}: {msg.message}</h1>
                    })}
                </section>
                <form onSubmit={this.newMessage}>
                    <input className="inputTxt" onChange={this.onInput}></input>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}
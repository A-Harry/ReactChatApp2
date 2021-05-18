import React from "react"
import io from "socket.io-client"
export default class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: "anonymous",
            messages: ["hay", "hey", "ay"],
            input:'',
            room: 'general'
        }
    }
    
    componentDidMount(){
        // this.socket.join(this.state.room)
        this.socket = io("localhost:4000");
        this.socket.on("new_msg", msg =>{
            console.log("new message")
            this.onReceivedMessage(msg)
        })
    }
    onInput = (e)=>{
        this.setState({
            input: e.target.value
        })
    }
    //send message to server
    newMessage = (event) =>{
        event.preventDefault();
        this.socket.emit("new_message", {message:this.state.input})
    }
    //when receiving message
    onReceivedMessage =(msg)=>{
        let arr = this.state.messages;
        this.setState({
            messages: msg.message
        })
    }
    
    render(){
        return (
        <div>
            <h1>ReactChat</h1>
            <section className="chatbox">{this.state.messages.map((msg) =>{
                return(
                <p>{msg}</p>
                )
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
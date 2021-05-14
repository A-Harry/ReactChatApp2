const EventLog = require("../models/eventLog");
const chatLog = require("../models/chatLog")

module.exports = (io) =>{
    io.on('connection', (socket) =>{
        socket.username = "anonymous"
        socket.room = "general"
        console.log("user connected");
        const eventDoc = new eventLog()

        // change username
        socket.on("change_username", (data)=>{
            socket.username = data.username;
            socket.join(socket.room);

            socket.emit("update_self", 
                {
                    message: `You have joined ${socket.room} as ${socket.username}`
                })
            
            socket.broadcast.emit("new_message", 
            {
                username: "SERVER",
                message: `${socket.username} joined the room` 
            })
        })

        //change rooms
        socket.on("change_room", (room)=>{
            if(socket.room != room){
                socket.leave(socket.room);
            }

            io.to(room).emit("new_message", {
                username: "SERVER:",
                message: `${socket.username} has left the room`
            })
        })

        //on message event
        socket.on("new_message", (data)=>{
            io.to(socket.room).emit("new_message", {
                username:socket.username,
                message: data.message
            })
        })
        //disconnect
        socket.on("disconnect", ()=>{
            console.log(`${socket.username} disconnected`)
        })
    })
}
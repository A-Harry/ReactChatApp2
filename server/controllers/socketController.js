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

        // change rooms
        socket.on("change_room", (room)=>{
            // ****** Leave previous room *******
            if(socket.room != room){
                socket.leave(socket.room);
            }
            io.to(socket.room).emit("new_message", {
                username: "SERVER:",
                message: `${socket.username} has left the room`
            });
            // ****** Join new Room *******
            socket.room = room
            socket.join(socket.room);
            socket.broadcast.emit("new_message", {
                username: "SERVER:",
                message: `${socket.username != "anonymous" ? socket.username : "new user"}
                has joined the room`
            });
            socket.emit("update_self", ({
                username: "SERVER:",
                message: `You have joined the room: ${socket.room}`
            }));
        });

        // listen on new_message event
        socket.on("new_message", (data)=>{
            io.to(socket.room).emit("new_message", {
                username:socket.username,
                message: data.message
            })
        })
        // listen on disconnect
        socket.on("disconnect", ()=>{
            console.log(`${socket.username} disconnected`)
        })
    })
}
const EventLog = require("../model/eventLog")



module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("new user connected");
        socket.username = "anonymous"
        socket.room = "general"

        socket.on('change_username', (data) => {
            //check if socket username is different
            if (socket.username != data.username) {
                socket.username = data.username
                console.log(socket.username);
                socket.join("general");

                io.to(socket.room).emit("new_message", {
                    username: "SERVER",
                    message: socket.username + " has joined the room"
                });
            }

            const eventDoc = new EventLog({
                event: "CONNECTION", socket_id: socket.id,
                user: socket.username, description: "new user connected"
            })
            eventDoc.save().then(event =>{
                console.log(event);
            }).catch(err =>{
                console.log(err)
            })
        }); //end "change_username" listener

        socket.on("new_message", (data) => {
            //broadcast the new message
            io.sockets.emit('new_message', {
                username: data.username ? data.username
                    : socket.username, message: data.message
            })
        })

        socket.on("typing", () => {
            socket.broadcast.emit("typing", { username: socket.username })
        })
    })
}
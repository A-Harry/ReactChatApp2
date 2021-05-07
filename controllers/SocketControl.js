const EventLog = require("../model/eventLog")
const UserEvent = require("../model/userEvent")



module.exports = (io) => {
    io.on('connection', (socket) => {
        // console.log("new user connected");
        socket.username = "anonymous"
        socket.room = "general"
        const eventDoc = new EventLog({
            event: "CONNECTION", socket_id: socket.id,
            username: socket.username, description: "new user connected"
        })
        //save connection event
        eventDoc.save().then(event => {
            console.log(event);
        }).catch(err => {
            console.log(err)
        })
        socket.join(socket.room);


        socket.on('change_username', (data) => {
            //check if socket username is different
            if (socket.username != data.username) {
                socket.username = data.username
                console.log(socket.username);
                socket.join(socket.room);

                socket.emit("update_self", {
                    message: `You have joined '${socket.room}' 
                    as ${socket.username}`
                })
                socket.broadcast.emit("new_message", {
                    username: "SERVER",
                    message: socket.username + " has joined the room"
                });
                // update matching socket_id with new username
                let doc = EventLog.findOneAndUpdate(
                    {socket_id: socket.id},{username:socket.username},
                    {new:true, useFindAndModify:false}, (err, res) =>{
                        if(err){
                            console.log("socket_id not found")
                        }
                        else{
                            console.log(res);
                        }
                    });
                    console.log(doc.username);
            }
        }); //end "change_username" listener

        socket.on('change_room', room => {
            if (socket.room != room) {
                socket.leave(socket.room)
                let event = new EventLog({
                    socket_id:socket.id, event: "LEAVE_ROOM",
                    username: socket.username, 
                    description: `${socket.username} left room '${socket.room}'`
                })
                event.save().then((result) =>{
                    console.log("LEAVE_ROOM event saved")
                },(reject)=>{
                    console.log("Error occurred while saving LEAVE_ROOM EVENT")
                })

                io.to(socket.room).emit("new_message", {
                    username: "SERVER:",
                    message: socket.username + " has left the room"
                })

                socket.room = room;
                socket.join(socket.room);
                //saving JOINED event
                event = new EventLog({
                    socket_id:socket.id, username:socket.username,
                    event: "JOINED_ROOM", description:`${socket.username} joined ${socket.room}`
                })
                event.save().then((result)=>{
                    console.log("JOINED event saved")
                })

                socket.emit("new_message", {
                    username: socket.username,
                    message: "You have joined room:" + socket.room
                })
                
                console.log(socket.rooms)

            }
        })

        socket.on("new_message", (data) => {
            //broadcast the new message
            io.to(socket.room).emit('new_message', {
                username: data.username ? data.username
                    : socket.username, message: data.message
            })
            let event = new UserEvent({
                socket_id: socket.id, username: socket.username,
                room: socket.room, message: data.message
            })
            event.save().then(result => {
                console.log("new message entry saved")
            }).catch((err) => {
                console.log(err)
                console.log("Error saving document")
            });
        })

        socket.on("typing", () => {
            socket.broadcast.to(socket.room).emit("typing", { username: socket.username })
        })
        socket.on("stop_typing", () => {
            socket.broadcast.emit("stop_typing")
        })

        socket.on("disconnect", () =>{
            console.log("user has disconnected")
            let event = new EventLog({
                socket_id:socket.id, username:socket.username,
                event:"DISCONNECTION", description: `${socket.username} disconnected`
            })
            event.save().then((result)=>{
                console.log("Disconnect event saved");
            })
        })
    })//End io.connect
}
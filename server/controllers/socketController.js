const EventLog = require("../models/eventLog");
const ChatLog = require("../models/chatLog")
const user = require("./userUtil")

module.exports = (io) =>{
    io.on('connection', (socket) =>{
        socket.username = "anonymous"
        socket.room = "general"
        console.log("user connected");
        socket.join(socket.room);
        user.joinRoom(socket.room);

        socket.emit("update_self", 
            {
                username: "SERVER",
                message: `You have joined ${socket.room} as ${socket.username}`,
                participants: user.participants
            })
        

        //      ---------- New Document for Connection Event -------------
        let eventDoc = new EventLog({
            event: "CONNECTION", socket_id: socket.id,
            username: socket.username, description: "new user connected"
        })
        //      --------- Save Document ----------
        eventDoc.save().then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log('error saving connection event document to Database')
        })
        
        // change username
        socket.on("change_username", (data)=>{
            //      ----------- Update Username in database ------------
            let eventDoc = EventLog.findOneAndUpdate({socket_id: socket.id}, 
                {username: data.username}, {new: true}, (err, docs)=>{
                    if (err){
                        console.log("error finding and updating socket")
                    }
                    else{
                        console.log("document updated")
                        console.log(docs)
                    }
                });
            socket.username = data.username;
            socket.join(socket.room);
            //      ------------ Update socket client of the name change ------------- 
            socket.emit("update_self", 
                {
                    username: "SERVER",
                    message: `You have joined ${socket.room} as ${socket.username}`,
                    participants: user.participants
                })
            
            socket.to(socket.room).emit("new_message", 
            {
                username: "SERVER",
                message: `${socket.username} joined the room`, 
                participants: user.participants
            })
        })

        // change rooms
        socket.on("change_room", (room)=>{
            //      --------- Leave previous room ---------
            if(socket.room != room){
                socket.leave(socket.room);
                user.leaveRoom(socket.room)

                let event = new EventLog({
                    event: "LEAVE_ROOM", socket_id: socket.id,
                    username: socket.username, description: `${socket.username} left room: ${socket.room}`
                })
                event.save().then((res)=>{
                    console.log("Leave event saved");
                    console.log(res);
                }).catch(err =>{
                    console.log("error saving 'leave' event")
                    console.log(err)
                })

                //      ------------ Send message to the previous Room --------------
                io.to(socket.room).emit("new_message", {
                    username: "SERVER",
                    message: `${socket.username} has left the room`,
                    participants: user.participants
                });

                //      ----------- Join new Room ------------
                socket.room = room
                socket.join(socket.room);
                user.joinRoom(socket.room);

                //      ----------- New Join Event saved ------------
                event = new EventLog({
                    event:"JOIN_ROOM", socket_id: socket.id,
                    username: socket.username, description: `${socket.username} joined room: ${socket.room}`
                })
                event.save().then(res =>{
                    console.log("Join event saved")
                    console.log(res)
                }).catch(err =>{
                    console.log("error saving 'join' event");
                    console.log(err);
                })

                //      ---------- Send message to new Room -------------
                socket.to(socket.room).emit("new_message", {
                    username: "SERVER",
                    message: `${socket.username != "anonymous" ? socket.username : "new user"}
                    has joined the room ${socket.room}`,
                    participants: user.participants
                });
                socket.emit("update_self", ({
                    username: "SERVER",
                    message: `You have joined the room: ${socket.room}`,
                    participants: user.participants
                }));
            }
        });

        //  ---------- listen on new_message event --------------
        socket.on("new_message", (data)=>{
            io.to(socket.room).emit("new_message", {
                username:socket.username,
                message: data.message
            })

            //      ----------- Save message event ----------------
            let event = new ChatLog({
                socket_id: socket.id, username: socket.username,
                room: socket.room, message:data.message
            })
            event.save().then(res =>{
                console.log("message event saved")
                console.log(res)
            }).catch(err =>{
                console.log("error saving message event");
                console.log(err)
            })
        })

        //  ---------- listen on disconnect -----------
        socket.on("disconnect", ()=>{
            console.log(`${socket.username} disconnected`)
            user.leaveRoom(socket.room)

            let event = new EventLog({
                event: "DISCONNECTION", socket_id: socket.id,
                username: socket.username, 
                description: `${socket.username} has disconnected from the server`
            })

            event.save().then(result =>{
                console.log("Disconnection event saved")
                console.log(result)
            }).catch(err =>{
                console.log("Error while saving Disconnection event")
                console.log(err)
            })

            io.to(socket.room).emit("new_message", {
                participants: user.participants,
                username: "SERVER",
                message: `${socket.username} has disconnected`
            })
        })
    })
}
const express = require('express');
const app = express(),
    PORT = process.env.PORT || 3000,
    server = app.listen(PORT);
const io = require("socket.io")(server);

app.set("view engine", 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('index')
})

server.on('listening', ()=>{
    console.log("server listening on port: " + PORT)
})

io.on('connection', (socket)=> {
    console.log("new user connected");
    socket.username = "anonymous"

    socket.on('change_username', (data) =>{
        socket.username = data.username
        console.log(socket.username);
    })

    socket.on("new_message", (data) =>{
        //broadcast the new message
        io.sockets.emit('new_message', {username: data.username ? data.username 
            : socket.username, message: data.message})
    })

    socket.on("typing", () =>{
        io.sockets.emit("typing", {username: socket.username})
    })
})

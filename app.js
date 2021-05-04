const express = require('express');
const app = express(),
    PORT = process.env.PORT || 3000,
    server = app.listen(PORT),
    apiRoutes = require("./routes/api"),
    { db_url } = require("./config/db.config"),
    mongoose = require("mongoose")
    

//after six hours this account will be deleted
mongoose.connect(db_url,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database Connected!")
    }).catch((err) => {
        console.log("Error occured. Connection to database failed")
    })

app.set("view engine", 'ejs');
app.use(express.static("public"))
app.use(apiRoutes);

//instantiate socketio and pass it in as an argument
//for socketControl.js
const io = require("socket.io")(server);
require("./controllers/SocketControl")(io)

server.on('listening', () => {
    console.log("server listening on port: " + PORT)
})


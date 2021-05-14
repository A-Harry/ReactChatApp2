
const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    PORT = process.env.PORT || 3000,
    server = app.listen(PORT),
    io = require("socket.io")(server);
const { db_url } = require('./config/db.config')

// ****** DATABASE CONNECTION *********
mongoose.connect(db_url,
    {useNewUrlParser:true, useUnifiedTopology: true}, (err) =>{
    if(err){
        console.log("error connecting to the database")
    }
    else{
        console.log("Database connected")
    }
})

// instantiate socket.io in socketController
const socketControl = require("./controllers/socketController")(io);

server.on("listening", ()=>{
    console.log("Server listening on port: " + PORT)
})
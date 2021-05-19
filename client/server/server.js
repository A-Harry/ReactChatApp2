
const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    PORT = process.env.PORT || 4000,
    server = require("http").createServer(app),
    io = require("socket.io")(server, {
        cors:{
            origin: "http://localhost:3000",
            // method: ["GET", "POST"]
    }}),
    bodyParser = require("body-parser");
    const { db_url } = require('./config/db.config')
    
    // instantiate socket.io in socketController
    require("./controllers/socketController")(io);

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

app.get("/", (req, res) =>{
    console.log("server");
    res.json("serve")
})

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
//         return res.status(200).json({});
//     }
//     next();
// });

// ******* SERVER LISTENING ON PORT **********************
server.listen(PORT, ()=>{
    console.log("Server listening on port: " + PORT)
})
const bodyParser = require('body-parser');

const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    PORT = process.env.PORT || 4000,
    server = require("http").createServer(app),
    io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:3000",
            // method: ["GET", "POST"]
        }
    }),
    { db_url } = require('./config/db.config'),
    apiRoutes = require("./routes/routes")

// instantiate socket.io in socketController
require("./controllers/socketController")(io);

// ****** DATABASE CONNECTION *********
mongoose.connect(db_url,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log("error connecting to the database")
        }
        else {
            console.log("Database connected")
        }
    })

    // form data will be sent as application/x-www-form-urlencoded
    app.use(express.urlencoded({extended: true}))
    app.use(apiRoutes)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
});

// ******* SERVER LISTENING ON PORT **********************
server.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let event = new Schema({
    event:{
        type:String,
        enum: ["CONNECTION", "DISCONNECTION", "JOINED_ROOM", "LEAVE_ROOM"]
    },
    socket_id: String,
    username: String,
    description: String
}, {timestamps:{updatedAt:false}});

module.exports = mongoose.model("eventlogs", event);
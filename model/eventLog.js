const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema({
    event: {
        type: String,
        enum: ["CONNECTION", "DISCONNECTION", "JOINED_ROOM", "LEAVE_ROOM"]
    },
    socket_id: String,
    username: String,
    description: String,
}, {timestamps: {updatedAt:false}});

const eventModel = mongoose.model("eventlogs", event);
module.exports = eventModel;
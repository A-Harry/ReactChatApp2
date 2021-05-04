const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema({
    event: {
        type: String,
        enum: ["CONNECTION", "DISCONNECTION", "JOINED_ROOM", "LEAVE_ROOM"]
    },
    socket_id: String,
    user: String,
    description: String,
}, {timestamps: true});

const eventModel = mongoose.model("eventlogs", event);
module.exports = eventModel;
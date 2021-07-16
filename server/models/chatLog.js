const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let chatLogs = new Schema({
    socket_id: String,
    username: String,
    room: String,
    message: String
}, {
    timestamps: {
        updatedAt: false
    }
})

module.exports = mongoose.model("chatLogs", chatLogs);
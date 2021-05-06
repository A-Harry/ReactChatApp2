const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEventSchema = new Schema({
    socket_id: String,
    user: String,
    room: String,
    message: String,
},{timestamps:{createdAt:true, updatedAt:false}});

const userEvent = mongoose.model("userEvent", userEventSchema)
module.exports= userEvent
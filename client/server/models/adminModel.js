const mongoose = require("mongoose");
const Schema = mongoose.Schema

let admin = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model("admin", admin)
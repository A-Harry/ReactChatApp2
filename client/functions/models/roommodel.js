const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let room = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("room", room);
const Room = require("./models/roommodel")
const test_db = require("./test-db")

exports.handler = async function(event, context, callback){
    query = event.queryStringParameters
    try{
        await Room.findById(query.id)
    }
}
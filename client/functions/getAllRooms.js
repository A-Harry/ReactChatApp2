const Room = require("./models/roommodel");
const test_db = require("./test-db");

test_db.handler()

exports.handler = async function (event, context){
    let allRooms;
    console.log(event.body)
    try{
         allRooms = await Room.find({})
        if (allRooms.length > 0)
         return{
            statusCode: 200,
            body: JSON.stringify(allRooms)
         }
         else{
            throw "no rooms found"
         }
    } catch(e) {
        return{
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}
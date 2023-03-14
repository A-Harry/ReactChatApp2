const Room = require("./models/roommodel")
const test_db = require("./test-db")

test_db.handler()

exports.handler = async function (event, context, callback) {
    // let chatroom = new Room(event.body);
    let req = JSON.parse(event.body)
    let chatroom = new Room(req)
    console.log(req.name);
    try {
        await chatroom.save().then(() => {
            console.log(`new room '${req.name}' has been created`)
            console.log(`The status of ${req.name} is ${req.status}`)

        })
        return {
            statusCode: 200,
            body: `new room "${req.name}" added successfully`
        }
    } catch(e) {
        console.log(req.body)
        console.log(e)
        return{
            statusCode:500,
            body: "Failed saving the new room"
        }
    }
    // return{
    //     statusCode: 200,
    //     // body: JSON.parse(event.body)
    // }
}
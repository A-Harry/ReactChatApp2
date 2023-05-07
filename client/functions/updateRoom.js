const test_db = require("./test-db")
const Room = require("./models/roommodel")

test_db.handler()
exports.handler = async function (event, context, callback) {
    body = JSON.parse(event.body)
    console.log(body)
    try {
        let doc = await Room.findById(body.id)
        if (doc == null || doc.length == 0) {
            throw ("error updating requested room: room not found");
            // console.log(doc);
        }
        else {
            let [name, status] = [body.roomName, body.status];
            if (doc.name == name && doc.status == status) {
                return {
                    statusCode: 500,
                    body: JSON.stringify("Room update unchanged")
                }
            }
            doc.name = name;
            doc.status = status
            doc.save().then(() => {
                console.log("Room has been updated")
                console.log(doc)
                // res.send("Room updated")
            }).catch(rejected => {
                console.log(rejected)
            })
            return {
                statusCode: 200,
                body: JSON.stringify(doc)
            }
        }
    } catch (err) {
        // console.log("Failed updating the room")
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify("Room update failed \n" + err)
        }
    }
}
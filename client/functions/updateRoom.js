const test_db = require("./test-db")
const Room = require("./models/roommodel")

test_db.handler()
exports.handler = async function (event, context, callback) {
    body = event.body
    try {
        Room.findById(body.id, (data) => {
            if (data == null || data.length == 0) {
                throw ("error retrieving requested room");
                // console.log(data);
            }
            else {
                let [name, status] = [body.roomName, body.status];
                if (data.name == name && data.status == status) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify("Room update unchanged")
                    }
                }
                data.name = name;
                data.status = status
                data.save().then(() => {
                    console.log("Room has been updated")
                    console.log(data)
                    // res.send("Room updated")
                })
                return {
                    statusCode: 200,
                    body: JSON.stringify(data)
                }
            }
        })
    } catch (err) {
        // console.log("Failed updating the room")
        console.log(err)
        return {
            statusCode: 400,
            body: JSON.stringify("Room update failed")
        }
    }
}
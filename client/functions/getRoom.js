const Room = require("./models/roommodel")
const test_db = require("./test-db")

test_db.handler()

exports.handler = async function (event, context, callback) {
    const query = event.queryStringParameters

    try {
        let data = await Room.findById(query.id)
            if (data == null || data.length == 0) {
                console.log("error finding the requested room details")
                // console.log(err)
                throw "error finding the requested room details"
            }
            else {
                console.log("Room details retrieved")
                console.log(data)
                return {
                    statusCode: 200
                }
            }
    } catch (e) {
        return {
            statusCode: 500,
            body:JSON.stringify(e)
        }
    }

}
const Room = require("./models/roommodel")
const test_db = require("./test-db")

test_db.handler()
exports.handler = async function (event, context, callback) {
    const query = event.queryStringParameters
    const method = event.httpmethod
    let doc = await Room.findById(query.id)
    if (doc == null || doc.length == 0) {
        return {
            statusCode: 500,
            body: JSON.stringify("error deleting requested room: room not found")
        }
    }
    else {
        try {
            let res = await doc.deleteOne()
            console.log(res)
            return {
                statusCode: 200,
                body: JSON.stringify(`room deleted \n \n ${res}`)
            }
        } catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify("error deleting the room \n" + e)
            }
        }
    }
}
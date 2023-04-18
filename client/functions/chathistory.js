const ChatLog = require("./models/chatmodel");
const mongoose = require("mongoose");
const test_db = require("./test-db");
const eventLog = require("../../server/models/eventLog");

var obj = {}
test_db.handler()

// console.log(Object.entries(obj).length)
exports.handler = async function (event, context, callback) {
    //check the url if there is a 
    const query = event.queryStringParameters
    const method = event.httpMethod
    // console.log(event)
    console.log(method)
    if (Object.entries(query).length == 0) {
        try {
            const doc = await ChatLog.find()
            return {
                statusCode: 200,
                body: JSON.stringify(doc)
            }
        } catch (err) {
            return {
                statusCode: 500,
                body: "error retrieving chatlog"
            }
        }
    } else if (method == "POST" && (event.queryStringParameters.room)) { //Get Chathistory of room
        try {
            const doc = await ChatLog.find().where({ room: event.queryStringParameters.room })
                .exec()
            if (doc.length == 0 || doc == null) {
                throw "error retrieving chatlog"
                }
                else{
                    return{
                        statusCode: 200,
                        body: JSON.stringify(doc)
                    }
                }

        } catch (err) {
            return {
                statusCode: 500,
                body: err
            }
        }
    } else {
        return {
            statusCode: 500,
            body: "invalid request - please use POST method"
        }
    }

}
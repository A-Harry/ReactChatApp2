const ChatLog = require("./models/chatmodel");
const mongoose = require("mongoose");
const test_db = require("./test-db");
const eventLog = require("../../server/models/eventLog");

var obj = {}
test_db.handler()
console.log(Object.entries(obj).length)
exports.handler = async function (event, context, callback) {
    const query = event.queryStringParameters
    // console.log(event)
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
    } else if (event.queryStringParameters.room) {
        try {
            const doc = await ChatLog.find().where({ room: event.queryStringParameters.room })
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
    }

}
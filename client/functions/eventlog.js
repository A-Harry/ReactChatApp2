const EventLog = require("./models/eventmodel");
const mongoose = require("mongoose");




exports.handler = async function (event, context, callback) {
    try {
        await mongoose.connect(process.env.DB_URL,
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Database connected")
        console.log(callback)
    } catch (err) {

        return {
            statusCode: 500,
            body: "Database failed to connect"
        }
    }
    try {
        const doc = await EventLog.find().sort({createdAt: "desc"})
        return {
            statusCode: 200,
            body: JSON.stringify(Object.keys(doc).map((i) => doc[i]))
        }
    } catch (err) {
        return{
            statusCode:500,
            body: "error retrieving doc"
        }
    }

}
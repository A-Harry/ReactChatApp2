const mongoose = require("mongoose");

exports.handler = async function (event, context, callback) {
    try{
        await mongoose.connect(process.env.DB_URL,
            { useNewUrlParser: true, useUnifiedTopology: true })
            console.log("Database connected")
            return {
                statusCode: 200
            }
        }catch(e){
            console.log(e)
            console.error("error connecting to database")
            return{
                statusCode: 500
            }
        }
    
}
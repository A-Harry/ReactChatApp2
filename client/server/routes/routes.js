const express = require("express");
const router = express.Router();
const chatLog = require("../models/chatLog"),
    eventLog = require("../models/eventLog");

router.get("/", (req, res) =>{
    res.render("index")
})

router.get("/api/eventLog", (req, res)=>{
    eventLog.find((err, docs) =>{
        if (err){
            res.json("Error finding eventLog docs")
        }
        else{
            console.log("retrieved docs")
            res.json(docs)
        }
    })
})

router.get("/api/history", (req, res)=> {
    chatLog.find((err, docs) =>{
        if (err){
            res.json("Error finding ChatLogs")
        }
        else{
            console.log("retrieved chatLogs")
            res.json(docs)
        }
    })
})

router.post("/api/history/:roomname", (req, res)=>{
    chatLog.find().where({room: req.params.roomname})
    .exec((err, docs)=>{
        if (err){
            console.log("could not find docs with given room name")
            res.json("error finding history for the requested room name")
        }
        else{
            console.log("room history retrieved")
            res.json(docs)
        }
    })
})

module.exports = router;
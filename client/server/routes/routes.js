const express = require("express");
const router = express.Router();
const chatLog = require("../models/chatLog"),
    eventLog = require("../models/eventLog");

router.get("/", (req, res) =>{
    res.render("index")
})
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).json({});
    }
    next();
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
    }).sort({createdAt: 'desc'})
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
    }).sort({createdAt: 'desc'})
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
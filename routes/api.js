const express = require("express"),
    route = express.Router(),
    eventlog = require("../model/eventLog"),
    userLog = require("../model/userEvent")

route.get("/", (req, res) => {
    res.render("index")
})


route.get("/api/eventLog", (req, res) => {
    eventlog.find((err, docs) => {
        if (err) {
            res.json("no documents found");
        }
        else {
            res.json(docs)
        }
    })
})

route.get("/api/history", (req, res) =>{
    userLog.find((err, docs) =>{
        if(err) {
            res.json("could not retrieve any documents")
        }
        else{
            res.json(docs)
        }
    })
})

route.post("/api/roomhistory/:roomname", (req, res)=>{
    userLog.where('room', req.params.roomname).exec((err, docs) =>{
        if(err){
            res.json("error retrieving documents");
        }
        else{
            res.json(docs);
        }
    })
})

module.exports = route;
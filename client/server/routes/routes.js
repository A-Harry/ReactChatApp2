const express = require("express");
const router = express.Router();
const ChatLog = require("../models/chatLog"),
    EventLog = require("../models/eventLog"),
    Admin = require("../models/adminModel"),
    Room = require("../models/room");
    
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).json({});
    }
    next();
})

router.get("/", (req, res) => {
    res.send("index")
    console.log("send")
})

//Get list of socketEvents
router.get("/api/eventLog", (req, res) => {
    EventLog.find((err, docs) => {
        if (err) {
            res.json("Error finding eventLog docs")
        }
        else {
            console.log("retrieved docs")
            res.json(docs)
        }
    }).sort({ createdAt: 'desc' })
})

//Get chat history of all rooms
router.get("/api/history", (req, res) => {
    ChatLog.find((err, docs) => {
        if (err) {
            res.json("Error finding ChatLogs")
        }
        else {
            console.log("retrieved chatLogs")
            res.json(docs)
        }
    })
})

//Get chat history of room
router.post("/api/history/:roomname", (req, res) => {
    ChatLog.find().where({ room: req.params.roomname })
        .exec((err, docs) => {
            if (err) {
                console.log("could not find docs with given room name")
                res.json("error finding history for the requested room name")
            }
            else {
                console.log("room history retrieved")
                res.json(docs)
            }
        })
})

//Get list of rooms
router.get("/api/rooms", (req, res) => {
    Room.find((err, docs) => {
        if (err) {
            console.log("error retrieving rooms list")
            console.log(err)
        }
        else {
            console.log("retrieved rooms list")
            res.json(docs)
        }
    })
})

//Add Room
router.post("/api/rooms/add", (req, res) => {
    let chatroom = new Room(req.body)
    chatroom.save().then(() => {
        console.log(`new room '${req.body.name}' has been created`)
        console.log(`The status of ${req.body.name} is ${req.body.status}`)
        res.status(200).json( `new room "${req.body.name}" added successfully` );
    })
        .catch(err => {
            res.status(400).send('Failed saving the new room')
            console.log(err)
        })
})

//Get room by id
router.get("/api/rooms/:id", (req, res) => {
    Room.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log("error finding the requested room details")
            console.log(err)
        }
        else {
            console.log("Room details retrieved")
            console.log(doc)
            res.send(doc)
        }
    })
})

// update room
router.post("/api/rooms/:id", (req, res) => {
    Room.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log("error retrieving requested room");
            console.log(err);
        }
        else {
            let [name, status] = [req.body.roomName, req.body.status];
            if (doc.name == name && doc.status == status) {
                return res.send("Room update unchanged")
            }
            doc.name = name;
            doc.status = status
            doc.save().then(() => {
                console.log("Room has been updated")
                console.log(doc)
                res.send("Room updated")
            })
                .catch(err => {
                    console.log("Failed updating the room")
                    console.log(err)
                })
        }
    })
})

//Delete room
router.delete("/api/rooms/delete/:id", (req, res) => {
    let roomID = req.params.id
    console.log(roomID)
    Room.findOneAndDelete({ _id: roomID }, (err, doc) => {
        if (err) {
            console.log("error deleting the room")
            console.log(err)
            res.send(err)
        }
        else {
            console.log(`Room "${doc.name}" with ID: ${roomID} Deleted`)
            console.log(doc)
            res.send(`Room "${doc.name}" with ID: ${roomID} Deleted`)
        }
    })
})

//Get admin details
router.get("/api/admin", (req, res) => {
    Admin.find((err, docs) => {
        if (err) {
            console.log("error retrieving admin records");
            console.log(err)
        }
        else {
            console.log("Admin doc retrieved")
            res.json(docs)
        }
    })
})

module.exports = router;
const Room = require("./models/roommodel")
const test_db = require("./test-db")

test_db.handler()

exports.handler = async function (event, context, callback) {
    // let chatroom = new Room(event.body);
    // add room
    let req = JSON.parse(event.body)
    let chatroom = new Room(req)
    console.log(req.name);
    try {
        await chatroom.save().then(() => {
            console.log(`new room '${req.name}' has been created`)
            console.log(`The status of ${req.name} is ${req.status}`)

        })
        return {
            statusCode: 200,
            body: `new room "${req.name}" added successfully`
        }
    } catch(e) {
        console.log(req.body)
        console.log(e)
        return{
            statusCode:500,
            body: "Failed saving the new room"
        }
    }
    // return{
    //     statusCode: 200,
    //     // body: JSON.parse(event.body)
    // }
}

// router.post("/api/rooms/add", (req, res) => {
//     let chatroom = new Room(req.body)
//     chatroom.save().then(() => {
//         console.log(`new room '${req.body.name}' has been created`)
//         console.log(`The status of ${req.body.name} is ${req.body.status}`)
//         res.status(200).json( `new room "${req.body.name}" added successfully` );
//     })
//         .catch(err => {
//             res.status(400).send('Failed saving the new room')
//             console.log(err)
//         })
// })


// function getRoom(){
//     try{
//     Room.findById(req.params.id, (err, doc) => {
//         if (err) {
//             console.log("error finding the requested room details")
//             console.log(err)
//         }
//         else {
//             console.log("Room details retrieved")
//             console.log(doc)
//             res.send(doc)
//         }
//     })
// }

// //Get room by id
// router.get("/api/rooms/:id", (req, res) => {
//     Room.findById(req.params.id, (err, doc) => {
//         if (err) {
//             console.log("error finding the requested room details")
//             console.log(err)
//         }
//         else {
//             console.log("Room details retrieved")
//             console.log(doc)
//             res.send(doc)
//         }
//     })
// })

// // update room
// router.post("/api/rooms/:id", (req, res) => {
//     Room.findById(req.params.id, (err, doc) => {
//         if (err) {
//             console.log("error retrieving requested room");
//             console.log(err);
//         }
//         else {
//             let [name, status] = [req.body.roomName, req.body.status];
//             if (doc.name == name && doc.status == status) {
//                 return res.send("Room update unchanged")
//             }
//             doc.name = name;
//             doc.status = status
//             doc.save().then(() => {
//                 console.log("Room has been updated")
//                 console.log(doc)
//                 res.send("Room updated")
//             })
//                 .catch(err => {
//                     console.log("Failed updating the room")
//                     console.log(err)
//                 })
//         }
//     })
// })

// //Delete room
// router.delete("/api/rooms/delete/:id", (req, res) => {
//     let roomID = req.params.id
//     console.log(roomID)
//     Room.findOneAndDelete({ _id: roomID }, (err, doc) => {
//         if (err) {
//             console.log("error deleting the room")
//             console.log(err)
//             res.send(err)
//         }
//         else {
//             console.log(`Room "${doc.name}" with ID: ${roomID} Deleted`)
//             console.log(doc)
//             res.send(`Room "${doc.name}" with ID: ${roomID} Deleted`)
//         }
//     })
// })

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

module.exports = route;
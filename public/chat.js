$(function () {
    //make connection
    var socket = io.connect("http://localhost:3000")

    //buttons and inputs
    var username = $("#username");
    var send_username = $("#send_username");
    var message = $("#message");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");
    var general = $("#general");
    var off_topic = $("#off-topic");
    var school = $("#school");

    //Emit change username
    send_username.click(() => {
        console.log(username.val());
        socket.emit("change_username", { username: username.val() });

    })

    socket.on("update_self", data => {
        chatroom.append("<p class=message>" + data.message)
    })

    //Change Rooms
    general.click(() => {
        socket.emit("change_room", "general");
    })
    off_topic.click(() => {
        socket.emit("change_room", "off-topic");
    })
    school.click(() => {
        socket.emit("change_room", "school");
    })

    send_message.click(() => {
        if (message.val().length != 0) {
            socket.emit("new_message", { message: message.val() })
            socket.emit("stop_typing")
            message.val('');
        }
    })

    socket.on("new_message", (data) => {
        console.log(data);
        chatroom.append("<p class=message>" + data.username + ": " + data.message);
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message... </i></p>");
    })

    socket.on("stop_typing", data => {
        feedback.html("")
    })

    message.keydown(event => {
        // When the client hits ENTER on their keyboard
        if (message.val().length != 0) {
            if (event.which === 13) {
                send_message.click()
            }
        }
    })

})
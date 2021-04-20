$(function() {
    //make connection
    var socket = io.connect("http://localhost:3000")
    
    //buttons and inputs
    var username = $("#username")
    var send_username = $("#send_username");
    var message = $("#message");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Emit change username
    send_username.click(() =>{
        console.log(username.val());
        socket.emit("change_username", {username: username.val()});

    })

    send_message.click(() =>{
        socket.emit("new_message", {message: message.val()})
    })

    socket.on("new_message", (data) =>{
        console.log(data);
        chatroom.append("<p class=message>" + data.username + ": " + data.message);
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //listen on typing
    socket.on('typing', (data) =>{
        feedback.html("<p><i>" + data.username + " is typing a message..." )
    })

})
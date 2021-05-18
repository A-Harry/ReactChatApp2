const io = require("socket.io-client")
export default function(){
    const socket = io("localhost:4000");
    function changeRooms(room){
        socket.emit("change_room", (room));
    }
    
    function changeUsername(username){
        socket.emit("change_username" (username));
    }
    
    function sendMessage(message){
        socket.emit("new_message", message)
    }
    
    function handleUpdateSelf(callback){
        socket.on("update_self", callback)
    }
    function handleMessage(callback){
        return socket.on("new_message", callback)
    }
    return {
        changeRooms,
        changeUsername,
        sendMessage,
        handleUpdateSelf,
        handleMessage
    };
}
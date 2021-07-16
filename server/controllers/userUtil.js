
    var participants = {}
    function joinRoom(room) {
        if (participants[room] == null) {
            participants[room] = 1;
        }
        else {
            participants[room] += 1
        }
        console.log(`number of participants: ${JSON.stringify(participants, null, ' ')}`)

    }
    
    function leaveRoom(room) {
        participants[room] -= 1
        console.log(`number of participants: ${JSON.stringify(participants, null, ' ')}`)
    }

    module.exports = {
        participants,
        joinRoom,
        leaveRoom
    }
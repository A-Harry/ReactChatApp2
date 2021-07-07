export default function Rooms(props) {
    return (
        <div id="roomList">
            <h2>Rooms: </h2>
            {props.rooms.map((room) => {
                if (room.status === "Active") {
                    return (
                        <button key={room._id} onClick={props.onChangeRoom} value={room.name}>{room.name}</button>
                    )
                }
            })
            }
        </div>
    )
}
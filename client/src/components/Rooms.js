import {Button} from "reactstrap"
export default function Rooms(props) {
    return (
        <div id="roomList">
            <h2>Rooms: </h2>
            {props.rooms.map((room) => {
                if (room.status === "Active") {
                    return (
                        <Button color="secondary" key={room._id} onClick={props.onChangeRoom} value={room.name}>{room.name}</Button>
                    )
                }
            })
            }
        </div>
    )
}
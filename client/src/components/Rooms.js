export default function Rooms(props){
    return(
        <div>
            {props.rooms.map(room =>{
                return(
                    <button onClick= {props.onChangeRoom} value={room}>{room}</button>
                )
            })}
        </div>
    )
}
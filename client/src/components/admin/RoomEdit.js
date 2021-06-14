const RoomEdit = (props) =>{
    const room = props.room;
    
    function handleSubmit(){
        console.log("kk")
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Room Name:</label>
            <input placeholder="Enter Room name" value={room.name} onChange></input>
            <select>
                <option>Active</option>
                <option>Inactive</option>
            </select>
            <button>Update room</button>
        </form>
    )

}
export default RoomEdit;
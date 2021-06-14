const RoomAdd = (props) =>{
    return (
        <div>
            <form>
                <label>
                    Room Name:
                </label>
                <input placeholder="enter a room name"></input>
                <label>
                    Status
                </label>
                <select>
                    <option>
                        Active
                    </option>
                    <option>
                        Inactive
                    </option>
                </select>
                <button type="submit">Add room</button>
            </form>
        </div>
    )
}

export default RoomAdd
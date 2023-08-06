import { useState } from "react"
import PlusIcon from "../images/PlusIcon.svg";


export default function AddGroupMember(props) {

    // front end input state
    const [groupMember, setGroupMember] = useState('')

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    function handleAddButtonClick() {
        // calling the prop function passed in
        props.submitGroupMemberAdd(groupMember);
        // Clearing the input field after submit
        setGroupMember('');
    }

    return (
        <div>
            <input className="add-members" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button className="add-user-icon" onClick={handleAddButtonClick}><img src={PlusIcon} alt="Add Member" /></button>
        </div>
    );
}
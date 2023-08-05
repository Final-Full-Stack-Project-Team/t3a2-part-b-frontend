import { useState } from "react"
import PlusIcon from "../images/PlusIcon.svg";


export default function AddGroupMember(props) {

    const [groupMember, setGroupMember] = useState('')

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    function handleAddButtonClick() {
        props.submitGroupMemberAdd(groupMember); // Call the submit function
        setGroupMember(''); // Clear the input field
    }

    return (
        <div>
            <input className="add-members" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button className="add-user-icon" onClick={handleAddButtonClick}><img src={PlusIcon} alt="Add Member" /></button>
        </div>
    );
}
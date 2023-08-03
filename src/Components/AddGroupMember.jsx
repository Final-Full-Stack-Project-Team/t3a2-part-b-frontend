import { useState } from "react"
import AddMemeberIcon from "../images/AddMemeberIcon.svg";


export default function AddGroupMember(props) {

    const [groupMember, setGroupMember] = useState('')

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    return(
        <div >
            <input className="add-people" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button className="add-user-icon" onClick={()=>props.submitGroupMemberAdd(groupMember)}><img src={AddMemeberIcon} style={{ fill: 'red' }} alt="Add Memeber"/></button>
        </div>
    )
}
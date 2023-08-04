import { useState } from "react"
import PlusIcon from "../images/PlusIcon.svg";


export default function AddGroupMember(props) {

    const [groupMember, setGroupMember] = useState('')

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    return(
        <div >
            <input className="add-people" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button className="add-user-icon" onClick={()=>props.submitGroupMemberAdd(groupMember)}><img src={PlusIcon} alt="Add Memeber"/></button>
        </div>
    )
}
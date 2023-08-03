import { useState } from "react"


export default function AddGroupMember(props) {

    const [groupMember, setGroupMember] = useState('')

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    return(
        <div>
            <input className="add-people" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button onClick={()=>props.submitGroupMemberAdd(groupMember)}>PLUS ICON</button>
        </div>
    )
}
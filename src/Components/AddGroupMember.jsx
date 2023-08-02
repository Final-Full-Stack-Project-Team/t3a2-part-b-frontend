import { useState } from "react"


export default function AddGroupMember(props) {

    const [groupMember, setGroupMember] = useState()

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    return(
        <div>
            <input type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Member email" />
            <button onClick={()=>props.submitGroupMemberAdd(groupMember)}>PLUS ICON</button>
        </div>
    )
}
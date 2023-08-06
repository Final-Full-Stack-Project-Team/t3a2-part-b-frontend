import { useState } from "react"
import PlusIcon from "../images/PlusIcon.svg";
import { findUser } from "../services/UserServices";


export default function AddGroupMember(props) {

    // front end input state
    const [groupMember, setGroupMember] = useState('')

    const object = props.object
    const updating = props.updating
    const admin = props.admin

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    async function submitGroupMemberAdd() {
        // get the user of the group member passed in
        const response = await findUser(groupMember)
        // if array is populated or its an object for updating
        if (object.length > 0 || updating) {
            // This is for the updating object
            if (updating && object.shared_with.map((member) => member.email).includes(groupMember)) {
                props.submit(null, 'User has already been added')
                return
            // This is for the new group array
            } if (!updating && object.map((member) => member.email).includes(groupMember)) {
                props.submit(null, 'User has already been added')
                return
            // Check if admin is equal to member typed in too
            } if (groupMember ===  admin.email) {
                props.submit(null, 'User has already been added')
                return
        }
        // check if empty
        } if (groupMember.trim() === '') {
            props.submit(null, 'User not found')
            return
        // pick up any other errors
        } if (response.error) {
            props.submit(null, response.error)
            return
        // submit updating data
        } if (updating) {
            const Updatedata = {
              ...object,
              shared_with: [...object.shared_with, response]
            }
            props.submit(Updatedata, null)
            setGroupMember('');
            return
        // else submit creating data
        } else {
            const Createdata = [...object, response]
            props.submit(Createdata, null)
            setGroupMember('');
            return
        }
    }

    return (
        <div>
            <input className="add-members" type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Add member" />
            <button className="add-user-icon" onClick={submitGroupMemberAdd}><img src={PlusIcon} alt="Add Member" /></button>
        </div>
    );
}
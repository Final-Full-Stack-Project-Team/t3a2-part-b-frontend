import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices"
import { useUserData } from "../contexts/UserContext"
import { createGroup } from "../services/GroupServices"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"


export default function CreateGroupForm() {
    const userData = useUserData()

    const [groupName, setGroupName] = useState('')
    const [groupAdmin, setGroupAdmin] = useState({})
    const [groupMember, setGroupMember] = useState('')
    const [groupMemberList, setGroupMemberList] = useState([])
    const [groupMemberError, setGroupMemberError] = useState('')

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const navigate = useNavigate()

    useEffect(() => {
        setGroupAdmin(userData)
    }, [])


    function handleGroupNameChange(event) {
        setGroupName(event.target.value)
    }

    function handleGroupMemberAddChange(event) {
        setGroupMember(event.target.value)
    }

    async function submitGroupMemberAdd() {
        const response = await findUser(groupMember)
        if (groupMemberList.map((member) => member.email).includes(groupMember)) {
            setGroupMemberError('User has already been added')
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
        } else if (groupMember === groupAdmin.email) {
            setGroupMemberError('User has already been added')
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
        } else if (response.error) {
            setGroupMemberError(response.error)
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
        } else {
            setGroupMemberList([...groupMemberList, response])
            console.log(groupMemberList)
        }
    }

    async function submitCreateGroup() {
        const data = {
            group_name: groupName,
            shared_with: groupMemberList.map((member) => member._id)
        }
        console.log(data)
        const response = await createGroup(data, cookie)
        if (response.error) {
            console.log(response.error)
        } else {
            navigate('/groups')
        }
    }

    return(
        <div>
            <div className="form">
                <input type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group name" />
                <input type="text" value={groupMember} onChange={handleGroupMemberAddChange} placeholder="Member email" />
                <button onClick={submitGroupMemberAdd}>PLUS ICON</button>
            </div>
            <div style={{ color: "white" }} className="member-list">
                {groupAdmin && 
                    <div>
                        {groupAdmin.email}
                    </div>
                }
                {groupMemberList && groupMemberList.map((member) => {
                    return(
                        <div key={member._id} style={{ color: "white" }}>
                            {member.email}
                        </div>
                    )
                })}
            </div>
            {groupMemberError && 
                <div style={{ color: "white" }} className="error">
                    <p>{groupMemberError}</p>
                </div>
            }
            <button onClick={submitCreateGroup}>CREATE GROUP BUTTON</button>
        </div>
    )
}
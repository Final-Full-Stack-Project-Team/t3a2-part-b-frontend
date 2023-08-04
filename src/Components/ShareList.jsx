import { useEffect, useState } from "react"
import { findAllGroups } from "../services/GroupServices"
import { useCookies } from "react-cookie"
import { addUserToList } from "../services/ListServices"
import { useNavigate, useParams } from "react-router"


export default function ShareList() {

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const [groups, setGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState(new Set())
    const [selectedMembers, setSelectedMembers] = useState([])
    const [displayError, setDisplayError] = useState('')

    const [formSubmitted, setFormSubmitted] = useState(false)

    const navigate = useNavigate()

    const _id = useParams()

    useEffect(() => {
        findAllGroups(cookie)
        .then((response) => {
            setGroups(response)
        })
    }, [])

    const handleCheckboxChange = (groupId) => {
        setCheckedGroups((prevSelected) => {
          const newSelected = new Set(prevSelected);
          if (newSelected.has(groupId)) {
            newSelected.delete(groupId); // Uncheck the checkbox
          } else {
            newSelected.add(groupId); // Check the checkbox
          }
          return newSelected;
        });
      };

    // Handle form submission
    const handleSubmit = async () => {
        const selectedMembersArray = new Set();
        checkedGroups.forEach((groupId) => {
        const group = groups.find((group) => group._id === groupId);
        if (group) {
            group.shared_with.forEach((member) => {
                if (member._id !== group.admin) {
                    selectedMembersArray.add(member._id)
                }
            })
        }
        });
        setSelectedMembers(Array.from(selectedMembersArray));
        setFormSubmitted(true)
    };

    useEffect(() => {
        if (formSubmitted) {
            const data = {
                shared_with: selectedMembers
            }
    
            console.log(data)
            addUserToList(_id._id, cookie, data)
            .then((response) => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    navigate(`/list/${_id._id}`)
                }
            })
        }

    }, [formSubmitted])

    return(
        <div style={{color: "white"}}>
            {groups && groups.map((group) => {
                return(
                    <div style={{ display: "flex", flexDirection: "row" }} key={group._id}>
                        <input type="checkbox" onChange={() => handleCheckboxChange(group._id)} checked={checkedGroups.has(group._id)} />
                        <p style={{color: checkedGroups[group._id] ? "green": "white"}}>{group.group_name}</p>
                    </div>
                )
            })}
            <button onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}
import { useEffect, useState } from "react"
import { findAllGroups } from "../services/GroupServices"
import { useCookies } from "react-cookie"


export default function ShareList() {

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const [groups, setGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState(new Set())
    const [selectedMembers, setSelectedMembers] = useState([])

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
    const handleSubmit = () => {
        const selectedMembersArray = new Set();
        checkedGroups.forEach((groupId) => {
        const group = groups.find((group) => group._id === groupId);
        if (group) {
            group.shared_with.forEach((member) => {
                selectedMembersArray.add(member._id)
            })
        }
        });
        setSelectedMembers(Array.from(selectedMembersArray));
    };

    useEffect(() => {
        console.log(selectedMembers);
      }, [selectedMembers]);

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
import { useEffect, useState } from "react"
import { findAllGroups } from "../services/GroupServices"
import { useCookies } from "react-cookie"


export default function ShareList() {

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const [groups, setGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState({})

    useEffect(() => {
        findAllGroups(cookie)
        .then((response) => {
            setGroups(response)
        })
    }, [])

    function selectGroup(group) {
        setCheckedGroups(prevCheckedItems => ({
          ...prevCheckedItems,
          [group._id]: !prevCheckedItems[group._id]
        }));
        console.log(groups)
      }

    function handleSubmit() {
        const selectedGroupsUsers = groups.filter(group => checkedGroups)
    }

    return(
        <div style={{color: "white"}}>
            {groups && groups.map((group) => {
                return(
                    <div style={{ display: "flex", flexDirection: "row" }} key={group._id}>
                        <input type="checkbox" onChange={() => selectGroup(group)} checked={checkedGroups} />
                        <p style={{color: checkedGroups[group._id] ? "green": "white"}}>{group.group_name}</p>
                    </div>
                )
            })}
        </div>
    )
}
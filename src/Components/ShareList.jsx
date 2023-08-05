import { useEffect, useState } from "react"
import { findAllGroups } from "../services/GroupServices"
import { useCookies } from "react-cookie"
import { addUserToList } from "../services/ListServices"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom";
import { useUserData } from "../contexts/UserContext"
import "../Styles/share-list.css";



export default function ShareList() {

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const [groups, setGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState(new Set())
    const [selectedMembers, setSelectedMembers] = useState([])

    const [formSubmitted, setFormSubmitted] = useState(false)

    const userData = useUserData()

    const navigate = useNavigate()

    const _id = useParams()

    useEffect(() => {
        findAllGroups(cookie)
        .then((response) => {
            setGroups(response)
        })
    // eslint-disable-next-line
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
           if (group.admin._id !== userData._id) {
                selectedMembersArray.add(group.admin._id)
           }
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
    
            addUserToList(_id._id, cookie, data)
            .then((response) => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    navigate(`/list/${_id._id}`)
                }
            })
        } 
    // eslint-disable-next-line
    }, [formSubmitted])

    return(
        <div >
            {groups && groups.map((group, index) => {
                const isLastGroup = index === groups.length - 1;
                return(
                    <div className={`share-list-with ${isLastGroup ? 'share-list-with-last-child' : ''}`} key={group._id}>
                        <input className="share-list-checkbox" type="checkbox" onChange={() => handleCheckboxChange(group._id)} checked={checkedGroups.has(group._id)} />
                        <div>
                            <p>{group.group_name}</p>
                        </div>
                        
                    </div>
                )
            })}
            <div>
                <button onClick={handleSubmit} className='share-list-update-button'>SHARE</button>
            </div>
            <div>
                <Link to="/">
                    <button className='share-list-cancel'>CANCEL</button>
                </Link>
            </div>
        </div>
    )
}
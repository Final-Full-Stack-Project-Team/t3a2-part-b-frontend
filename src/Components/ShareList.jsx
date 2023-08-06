import { useEffect, useState } from "react"
import { findAllGroups } from "../services/GroupServices"
import { useCookies } from "react-cookie"
import { addUserToList } from "../services/ListServices"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom";
import { useUserData } from "../contexts/UserContext"
import "../Styles/share-list.css";



export default function ShareList() {

    // local state variables saved here
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const [groups, setGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState(new Set())
    const [selectedMembers, setSelectedMembers] = useState([])

    const [formSubmitted, setFormSubmitted] = useState(false)

    const userData = useUserData()

    const navigate = useNavigate()

    // params saved here
    const _id = useParams()

    // Get's all groups in the DB
    useEffect(() => {
        findAllGroups(cookie)
        .then((response) => {
            setGroups(response)
        })
    // eslint-disable-next-line
    }, [])

    // Function to handle the groups as their checkbox is checked and unchecked
    const handleCheckboxChange = (groupId) => {
        setCheckedGroups((prevSelected) => {
            // using a set to prevent duplicates
          const newSelected = new Set(prevSelected);
          if (newSelected.has(groupId)) {
            newSelected.delete(groupId); // Uncheck the checkbox
          } else {
            newSelected.add(groupId); // Check the checkbox
          }
          return newSelected;
        });
      };

    const handleSubmit = async () => {
        // using set to prevent duplicates again
        const selectedMembersArray = new Set();
        // handling group members from checked groups
        checkedGroups.forEach((groupId) => {
        const group = groups.find((group) => group._id === groupId);
        if (group) {
            // Push each group member that is not the group admin to the set
            group.shared_with.forEach((member) => {
                if (member._id !== group.admin) {
                    selectedMembersArray.add(member._id)
                }
            })
            // allowing group admin to the set if that is not the user
           if (group.admin._id !== userData._id) {
                selectedMembersArray.add(group.admin._id)
           }
        }
        });
        // Setting the state, converting the set to an array
        setSelectedMembers(Array.from(selectedMembersArray));
        setFormSubmitted(true)
    };

    useEffect(() => {
        if (formSubmitted) {
            // create data to send in fetch request
            const data = {
                shared_with: selectedMembers
            }
            // Fetch request
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
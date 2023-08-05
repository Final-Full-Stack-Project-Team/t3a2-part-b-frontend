import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices"
import { useUserData } from "../contexts/UserContext"
import { createGroup } from "../services/GroupServices"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import AddGroupMember from "./AddGroupMember"
import NavMenu from "../Components/NavMenu";
import { Link } from "react-router-dom";
import "../Styles/create-group.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus} from '@fortawesome/free-solid-svg-icons'


export default function CreateGroupForm() {
    const userData = useUserData()

    const [groupName, setGroupName] = useState('')
    const [groupAdmin, setGroupAdmin] = useState({})
    const [groupMemberList, setGroupMemberList] = useState([])
    const [groupMemberError, setGroupMemberError] = useState('')

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const navigate = useNavigate()

    useEffect(() => {
        setGroupAdmin(userData)
    }, [])


    function handleGroupNameChange(event) {
        const inputValue = event.target.value;
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setGroupName(capitalizedValue);
    }

    async function submitGroupMemberAdd(groupMember) {
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
        }
    }

    async function submitCreateGroup() {
        const data = {
            group_name: groupName,
            shared_with: groupMemberList.map((member) => member._id)
        }
        const response = await createGroup(data, cookie)
        if (response.error) {
            setGroupMemberError(response.error)
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
        } else {
            navigate('/groups')
        }
    }

    // State to track if the navigation menu is open or closed
   const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

   // Function to toggle the navigation menu state
   const toggleNavMenu = () => {
       setIsNavMenuOpen(prevState => !prevState);
   };


    return(
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className={isNavMenuOpen ? 'nav-closed' : 'nav-open'}>
                <header className="fake-header">
                    <p className="list-page-heading">Create Group</p>  
                </header>
                <div className="group-details-body">
                    
                    <input className="edit-group-name" type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group name" />
                    <div className="add-member-btn"><FontAwesomeIcon icon={faUserPlus}/></div>
                    <AddGroupMember submitGroupMemberAdd={submitGroupMemberAdd} />
                </div>
                
                <div style={{ color: "#f2f2f2" }} >
                    {groupAdmin && 
                        <div className="ng_shared_with">
                            {groupAdmin.email}
                        </div>
                    }
                    {groupMemberList && groupMemberList.map((member) => {
                        return(
                            <div className="ng_shared_with" key={member._id}>
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
                <div>
                <button to="/groups" onClick={submitCreateGroup} className='ng-update-button'>CREATE</button>
              </div>

              <div>
                <Link to="/Groups">
                    <button className="ng-cancel">CANCEL</button>
                </Link>  
              </div>
            </div>
    </div>
            
    )
}
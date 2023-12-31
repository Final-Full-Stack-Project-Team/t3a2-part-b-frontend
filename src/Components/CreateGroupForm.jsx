import { useEffect, useState } from "react"
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

    // Local state saved here
    const [groupName, setGroupName] = useState('')
    const [groupAdmin, setGroupAdmin] = useState({})
    const [groupMemberList, setGroupMemberList] = useState([])
    const [groupMemberError, setGroupMemberError] = useState('')

    // Cookie authentication state saved here
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const navigate = useNavigate()

    useEffect(() => {
        setGroupAdmin(userData)
    // eslint-disable-next-line
    }, [])

    function handleGroupNameChange(event) {
        const inputValue = event.target.value;
        // Forcing the input value to be capitalized
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        // Set group name to state
        setGroupName(capitalizedValue);
    }

    // Function passed as a prop to submit group member
    async function submitGroupMemberAdd(data, error) {
        if (error) {
            setGroupMemberError(error)
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
            return
        } else {
            setGroupMemberList(data)
        }
    }

    // Runs when submit is clicked
    async function submitCreateGroup() {
        // Build data object to send in fetch request
        const data = {
            group_name: groupName,
            shared_with: groupMemberList.map((member) => member._id)
        }
        // fetch request
        const response = await createGroup(data, cookie)
        // error response
        if (response.error) {
            setGroupMemberError(response.error)
            setTimeout(() => {
                setGroupMemberError('')
            }, 3000)
        // else navigate back to groups
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
                    {groupMemberError && 
                    <div className="error">
                        <p className="no-name-error">{groupMemberError}</p>
                    </div>
                }
                    <div className="add-member-btn"><FontAwesomeIcon icon={faUserPlus}/></div>
                    <AddGroupMember object={groupMemberList} admin={groupAdmin} updating={false} submit={submitGroupMemberAdd} />
                </div>
                
                <div  >
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
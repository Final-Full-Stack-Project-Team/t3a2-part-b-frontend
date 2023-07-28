import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import { useState, useEffect } from "react"
import { useGroupData } from "../reducers/GroupReducer";
import { findAllGroups } from "../services/GroupServices";
import { useCookies } from "react-cookie"

export default function Groups(props) {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const [setGroups] = useState([])
    const groupData = useGroupData()

    const cookie = `Bearer ${cookies.authorization}`

    const globalGroupsdata = useGroupData();
   
    useEffect(() => {
        let user = groupData?._id
        if (user) {
            findAllGroups(cookie)
            .then((response) => {
                setGroups(response)
            })
        }
    // eslint-disable-next-line    
    }, [])

    // State to track if the navigation menu is open or closed
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Function to toggle the navigation menu state
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prevState => !prevState);
    };

    return ( 
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className="all-content">
                <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                    <header className="fake-header">
                        <p className="page-title">My Groups</p>
                    </header>


                    {/* IMPORTANT! All page content goes in the body class */}
                    <div className="body">
                        <p>You have {globalGroupsdata.length} Group{globalGroupsdata.length !==1 ? 's' : '' }</p>
                        {globalGroupsdata.map((group) => {
                            return(
                                <div key={group._id}>
                                <p>Group name: {group.group_name}</p>
                                <p>Group admin: {group.admin}</p>
                                <p>Shared with: {group.shared_with}</p>
                                <p>Date Created: {new Date(group.dateCreated).toLocaleDateString()}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
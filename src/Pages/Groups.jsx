import { useEffect, useState } from "react";
import { findAllGroups } from "../services/GroupServices";
import { useCookies } from "react-cookie";
import { useGroupData } from "../reducers/GroupReducer";
import NavMenu from "../Components/NavMenu";

export default function Groups(props) {
    const [cookies] = useCookies();
    const [groups, setGroups] = useState([]);
    const cookie = `Bearer ${cookies.authorization}`;

    // Fetch data from the API when the component mounts
    useEffect(() => {
        findAllGroups(cookie)
            .then((response) => {
                setGroups(response); // Update state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [cookie]);

    // State to track if the navigation menu is open or closed
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Function to toggle the navigation menu state
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prevState => !prevState);
    };

    // Render the groups data
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
                        <p>You have {groups.length} Group{groups.length !== 1 ? 's' : '' }</p>
                        {groups.map((group) => {
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
    );
}

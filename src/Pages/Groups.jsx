import { useEffect, useState } from "react";
import { findAllGroups } from "../services/GroupServices";
import { useCookies } from "react-cookie";
// import { useGroupData } from "../reducers/GroupReducer";
import NavMenu from "../Components/NavMenu";
import "../Styles/groups.css";
import "../Styles/pages.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import NoGroups from "../Components/NoGroups";

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
          <div className={isNavMenuOpen ? 'nav-closed' : 'nav-open'}>
            <header className="fake-header">
              <p className="page-title">Groups</p>
              <p className="groups-count">
                {groups.length} Group{groups.length !== 1 ? 's' : ''}
              </p>
            </header>
    
            {/* IMPORTANT! All page content goes in the body class */}
            <div className="body">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div className="groups-container" key={group._id}>
                    <p className="groups-icon">
                      <FontAwesomeIcon icon={faUserGroup} />
                    </p>
                    <Link className="groups-label" to={`/groups/${group._id}`}>
                      {group.group_name}
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <NoGroups />
                </div>
              )}
              <Link to={'/groups/add'}>ADD GROUP BUTTON</Link>
            </div>
          </div>
        </div>
      );
    }
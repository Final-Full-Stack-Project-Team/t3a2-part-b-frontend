import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findGroup } from '../services/GroupServices';
import { useCookies } from 'react-cookie';
import NavMenu from "../Components/NavMenu";
import "../Styles/group-details.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function GroupDetails() {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [cookies] = useCookies();

  useEffect(() => {
    // Fetch the group details when the component mounts
    findGroup(groupId, cookies.authorization) // Pass the token to the findGroup function
      .then((response) => {
        console.log('Fetched group details:', response);
        setGroupDetails(response);
      })
      .catch((error) => {
        console.error('Error fetching group details:', error);
      });
  }, [groupId, cookies.authorization]);

  console.log('Group details state:', groupDetails);

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
      <div className={isNavMenuOpen ? 'nav-closed' : 'nav-open'}>
        <header className="fake-header">
          <p className="page-title">Group details</p>
          {groupDetails?.admin && <p className="admin">Admin: {groupDetails.admin.name}</p>}
        </header>
  
        {/* IMPORTANT! All page content goes in the body class */}
        <div className="group-details-body">
          {groupDetails ? (
            <div>

              {groupDetails?.dateCreated && (
                <div className="group-date">Created on {new Date(groupDetails.dateCreated).toLocaleDateString()}</div>
              )}

              <div >
                <input className="edit-group-name" placeholder={groupDetails.group_name}></input>
              </div>

              <div>
                <div className="add-icon"><FontAwesomeIcon icon={faUserPlus}/></div>
              
                <input className="add-people" placeholder= "Add people"></input>
              </div>

              {groupDetails?.shared_with && groupDetails.shared_with.length > 0 && (
                  <div >
                    {groupDetails.shared_with.map((user) => (
                      <div className="shared_with" key={user.id}>{user.email}</div>
                    ))}
                  </div>
                )}
              
            </div>
          ) : (
            <p>Loading group details...</p>
          )}

        </div>
      </div>
    </div>
  );
}  
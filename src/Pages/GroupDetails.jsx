import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findGroup, updateGroup } from '../services/GroupServices';
import { useCookies } from 'react-cookie';
import NavMenu from "../Components/NavMenu";
import "../Styles/group-details.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import AddGroupMember from '../Components/AddGroupMember';
import { findUser } from '../services/UserServices';

export default function GroupDetails() {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupMemberError, setGroupMemberError] = useState()
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

  //console.log('Group details state:', groupDetails);

   // State to track if the navigation menu is open or closed
   const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

   // Function to toggle the navigation menu state
   const toggleNavMenu = () => {
       setIsNavMenuOpen(prevState => !prevState);
   };

   async function submitGroupMemberAdd(groupMember) {
    console.log(typeof(groupMember))
    const response = await findUser(groupMember)
    console.log(response)
    if (groupDetails.shared_with.map((member) => member.email).includes(groupMember)) {
        setGroupMemberError('User has already been added')
        setTimeout(() => {
            setGroupMemberError('')
        }, 3000)
    } else if (groupMember === groupDetails.admin.email) {
        setGroupMemberError('User has already been added')
        setTimeout(() => {
            setGroupMemberError('')
        }, 3000)
    } else if (groupMember.trim() === '') {
      setGroupMemberError('User not found')
      setTimeout(() => {
        setGroupMemberError('')
    }, 3000)
    } else if (response.error) {
        setGroupMemberError(response.error)
        setTimeout(() => {
            setGroupMemberError('')
        }, 3000)
    } else {
        const updatedGroupDetails = {
          ...groupDetails,
          shared_with: [...groupDetails.shared_with, response]
        }
        setGroupDetails(updatedGroupDetails)
    }
}

    async function handleupdateGroup() {
      const data = {
        shared_with: groupDetails.shared_with.map((user) => user._id)
      }
      console.log(cookies.authorization)
      console.log(groupDetails._id)
      const response = await updateGroup(data, cookies.authorization, groupDetails._id )
      console.log(response)
    }

    async function handleRemoveUser(user_id) {
      const newGroupMemberArray = groupDetails.shared_with.filter((user) => user._id !== user_id )
      const updatedGroupDetails = {
        ...groupDetails,
        shared_with: newGroupMemberArray
      }
      setGroupDetails(updatedGroupDetails)
    }

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
              
                <AddGroupMember submitGroupMemberAdd={submitGroupMemberAdd} />
                {groupMemberError && 
                  <div style={{color: "white"}}>
                    {groupMemberError}
                  </div>
                }
              </div>

              {groupDetails?.shared_with && groupDetails.shared_with.length > 0 && (
                  <div >
                    {groupDetails.shared_with.map((user) => (
                      <div className="shared_with" key={user._id}>
                        {user.email}
                        <button onClick={() => {handleRemoveUser(user._id)}}>REMOVE ICON</button>
                        </div>
                    ))}
                  </div>
                )}
              <div>
                <button onClick={handleupdateGroup} className='update-button'>UPDATE</button>
              </div>

              <div>
                <Link to="/Groups">
                <button className='cancel'>CANCEL</button>
                </Link>
                
              </div>
            </div>
          ) : (
            <p>Loading group details...</p>
          )}
        </div>
      </div>
    </div>
  );
}  
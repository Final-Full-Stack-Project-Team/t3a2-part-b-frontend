import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteGroup, findGroup, updateGroup } from '../services/GroupServices';
import { useCookies } from 'react-cookie';
import NavMenu from "../Components/NavMenu";
import "../Styles/group-details.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import AddGroupMember from '../Components/AddGroupMember';
import { useUserData } from '../contexts/UserContext';
import GroupOptions from "../Components/GroupOptions"


export default function GroupDetails() {
  // Local state vairables saved here
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupMemberError, setGroupMemberError] = useState()
  const [cookies] = useCookies();
  const [showOptions, setShowOptions] = useState(false)
  const userData = useUserData()
  const navigate = useNavigate()

  const [updatedGroupName, setUpdatedGroupName] = useState('');

  useEffect(() => {
    // Fetch the group details when the component mounts
    findGroup(groupId, cookies.authorization)
      .then((response) => {
        setGroupDetails(response);
      })
      .catch((error) => {
        console.error('Error fetching group details:', error);
      });
  }, [groupId, cookies.authorization]);

   // State to track if the navigation menu is open or closed
   const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

   // Function to toggle the navigation menu state
   const toggleNavMenu = () => {
       setIsNavMenuOpen(prevState => !prevState);
   };

   async function submitGroupMemberAdd(data, error) {
    if (error) {
      setGroupMemberError(error)
      setTimeout(() => {
          setGroupMemberError('')
      }, 3000)
      return
    } else {
      setGroupDetails(data)
  }
}

async function handleupdateGroup() {
  const capitalizedGroupName = updatedGroupName.charAt(0).toUpperCase() + updatedGroupName.slice(1);
  
  // build data to send to fetch request
  const data = {
    shared_with: groupDetails.shared_with.map((user) => user._id),
    group_name: capitalizedGroupName || groupDetails.group_name,
  };
  // fetch request to update group with new members or new group name, or both
  await updateGroup(data, cookies.authorization, groupDetails._id);
  navigate('/groups');
}

    
    async function handleRemoveUser(user_id) {
      // filter out the user to be removed
      const newGroupMemberArray = groupDetails.shared_with.filter((user) => user._id !== user_id )
      // build new data after filter
      const updatedGroupDetails = {
        ...groupDetails,
        shared_with: newGroupMemberArray
      }
      // set the local state with new data
      setGroupDetails(updatedGroupDetails)
    }
    
    // Funtion to run when user leaves group
    async function handleLeaveGroup() {
      // filter users with remaining members
      let newSharedWith = groupDetails.shared_with.filter((user) => user._id !== userData._id).map((user) => user._id)
      // create new data to send for fetch request
      let data = {
        shared_with: newSharedWith
      }
      // check if user leaving was admin
      if (userData._id === groupDetails.admin._id) {
        // set new admin to first member of group
        const newAdmin = groupDetails.shared_with[0]
        // take new admin out of shared_with field
        newSharedWith = newSharedWith.filter((user) => user !== newAdmin._id)
        // If user was admin and no member to assign admin. Delete the group
        if (!newAdmin) {
          handleDeleteGroup()
          return
        }
        data = {
          shared_with: newSharedWith,
          admin: newAdmin._id
        }
      }
      // eslint-disable-next-line
      await updateGroup(data, cookies.authorization, groupDetails._id)
      navigate('/groups')
    }

    // function to delete group
    async function handleDeleteGroup() {
      deleteGroup(cookies.authorization, groupDetails._id)
      navigate('/groups')
    }
    // change state to display option or not
    function handleOptions() {
      setShowOptions(!showOptions)
  }



   return (
    <div>
      <div>
        {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
        <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
      </div>
      <div className={isNavMenuOpen ? 'nav-closed' : 'nav-open'}>
        <header className="fake-header">
          <p className="group-page-heading">Edit Group</p>
          {groupDetails?.admin && <p className="page-sub-heading">Admin: {groupDetails.admin.name}</p>}
          <div className="group-options">
        <button onClick={handleOptions}>
          <FontAwesomeIcon icon={faEllipsisVertical} size="2x" />
        </button>
        {showOptions && (
          <GroupOptions
            isAdmin={userData._id === groupDetails.admin._id}
            handleLeaveGroup={handleLeaveGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        )}
              </div>
          
        </header>
        {/* <button onClick={handleLeaveGroup}>LEAVE GROUP</button>
        <button onClick={handleDeleteGroup}>DELETE GROUP</button> */}
        
        <div className="group-details-body">
          {groupDetails ? (
            <div>
              {groupDetails?.dateCreated && (
                <div className="group-date">Created on {new Date(groupDetails.dateCreated).toLocaleDateString()}</div>
              )}
              <div>
                <input className="edit-group-name" placeholder={groupDetails.group_name} value={updatedGroupName} onChange={(e) => setUpdatedGroupName(e.target.value)}/>
              </div>
              {groupMemberError && 
                  <p className="no-name-error">{groupMemberError}</p>
                }
              <div>
                <div className="add-member-btn"><FontAwesomeIcon icon={faUserPlus}/></div>
              
                <AddGroupMember object={groupDetails} admin={groupDetails.admin} updating={true} submit={submitGroupMemberAdd} />
                {groupMemberError && 
                  <div>
                    {groupMemberError}
                  </div>
                }
              </div>

              {groupDetails?.shared_with && groupDetails.shared_with.length > 0 && (
                  <div >
                    {groupDetails.shared_with.map((user) => (
                      <div className="current-members" key={user._id}>
                        {user.email}
                        <div className='remove-guest-btn-body'>
                        <button className='remove-guest-btn' onClick={() => {handleRemoveUser(user._id)}}><FontAwesomeIcon icon={faX}/></button>
                        </div>
                        
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
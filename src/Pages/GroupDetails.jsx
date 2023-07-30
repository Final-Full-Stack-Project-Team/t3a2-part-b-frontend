import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findGroup } from '../services/GroupServices';
import { useCookies } from 'react-cookie';

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

  return (
    <div style={{ color: '#f2f2f2', margin: '20px' }}>
      {groupDetails ? (
        <>
          <h1>Group details</h1>
          <p>Group Name: {groupDetails.group_name}</p>
          {groupDetails.admin && <p>Admin: {groupDetails.admin.name}</p>}
          {groupDetails.shared_with && groupDetails.shared_with.length > 0 && (
            <div>
              <p>Shared with: {groupDetails.shared_with.map((user) => user.name).join(', ')}</p>
            </div>
          )}
          {groupDetails.dateCreated && (
            <p>Date Created: {new Date(groupDetails.dateCreated).toLocaleDateString()}</p>
          )}
        </>
      ) : (
        <p>Loading group details...</p>
      )}
    </div>
  );
}


function GroupOptions(props) {
    return (
      <div className="group-overlay">
        <div className="group-overlay-content">
          <p className="group-overlay-text" onClick={props.handleLeaveGroup}>
            Leave Group
          </p>
          {props.isAdmin && (
            <p className="group-overlay-text" onClick={props.handleDeleteGroup}>
              Delete Group
            </p>
          )}
        </div>
      </div>
    );
  }
  
  export default GroupOptions;
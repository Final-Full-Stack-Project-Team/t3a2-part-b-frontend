

function GroupOptions(props) {
  const optionCount = props.isAdmin ? 2 : 1; // If admin, show 2 options; otherwise, show 1 option
  const overlayHeight = 0.7 + 2.1 * optionCount + 'em'; // Adjust as needed based on your styling

  const overlayStyle = {
    height: overlayHeight,
  };

  return (
    <div className="group-overlay" style={overlayStyle}>
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
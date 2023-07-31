

export default function ListOptions (props) {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <p onClick={props.handleRename}>Rename list</p>
                <p onClick={props.handleCompleted}>Move to completed</p>
                <p>Delete List</p>
            </div>
        </div>
    )
}

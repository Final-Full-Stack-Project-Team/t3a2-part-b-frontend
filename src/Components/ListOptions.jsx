

export default function ListOptions (props) {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <p className="overlay-text" onClick={props.handleRename}>Rename list</p>
                <p className="overlay-text" onClick={props.handleCompleted}>Move to completed</p>
                <p className="overlay-text" onClick={props.handleDelete}>Delete List</p>
            </div>
        </div>
    )
}



export default function ListOptions (props) {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <p className="overlay-text" onClick={props.handleRename}>Rename list</p>
                <p className="overlay-text" onClick={props.handleCompleted}>Add to Completed</p>
                <p className="overlay-text" onClick={props.handleDelete}>Delete list</p>
            </div>
        </div>
    )
}

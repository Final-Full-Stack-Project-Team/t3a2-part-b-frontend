

export default function DeleteList(props) {
    return (
        <div className="delete-overlay">
            <div className="delete-content">
                <p>Deleting this list cannot be undone. <br /> Continue?</p>
                <div className="delete-buttons">
                    <button onClick={props.handleDelete}>TICK</button>
                    <button onClick={props.handleCancel}>CROSS</button>
                </div>
            </div>
        </div>
    )
}
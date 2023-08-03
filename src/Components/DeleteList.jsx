import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function DeleteList(props) {

    const isLargeScreen = window.innerWidth > 1200;

    return (
        <div className={isLargeScreen ? "delete-overlay-large" : "delete-overlay"}>
            <div className="delete-content">
                <p>Deleting this list cannot be undone. <br /> Continue?</p>
                <div className="delete-buttons">
                    <button className="x-icon-delete" onClick={props.handleDelete}><FontAwesomeIcon icon={faCheck}/></button>
                    <button className="tick-icon-delete"onClick={props.handleCancel}><FontAwesomeIcon icon={faX}/></button>
                </div>
            </div>
        </div>
    )
}
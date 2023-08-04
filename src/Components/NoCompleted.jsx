import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-lists.css";

export default function NoCompleted() {
    return (
        <div className="no-lists-body"> 
            <p className="no-lists-label">
                You have no Completed Lists.
            </p> 
            <p className="create-list-label">
                Completed lists go here.
            </p> 
            <p className="list-instructions-label">
                View your active lists in "My Lists".
            </p>
           
            <p className="completed-icon">
            <FontAwesomeIcon icon={faListCheck} /> 
            </p>
        </div>   
    )
}
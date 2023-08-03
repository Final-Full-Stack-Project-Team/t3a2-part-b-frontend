import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-lists.css";

export default function NoCompleted() {
    return (
        <div className="no-lists-body"> 
            <p className="no-lists-label">
                You have no Completed Lists.
            </p> 
            <p className="create-list-label">
                View your active lists in "My Lists"
            </p> 
           
            <p className="completed-icon">
            <FontAwesomeIcon icon={faCheck} /> 
            </p>
        </div>   
    )
}
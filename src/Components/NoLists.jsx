import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-lists.css";

export default function NoLists() {
    return (
        <div className="no-lists-body"> 
            <p className="no-lists-label">
                You have no Lists.
            </p> 
            <p className="create-list-label">
                Create your Lists here!
            </p> 
            <p className="list-instructions-label">
                Tap plus to create your first List.
            </p> 
            <p className="list-icon">
            <FontAwesomeIcon icon={faList} /> 
            </p>
        </div>   
    )
}
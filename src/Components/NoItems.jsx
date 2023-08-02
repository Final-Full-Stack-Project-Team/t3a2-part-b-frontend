import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-lists.css";

export default function NoLists() {
    return (
        <div className="no-lists-body"> 
            <p className="no-lists-label">
                You have no Items!
            </p> 
            <p className="no-list-instructions">
                To start your list, add an Item 
            </p> 
            <p className="no-list-instructions2">
            in the "Add Item" field above
            </p>
            <p className="no-list-icon">
            <FontAwesomeIcon icon={faList} /> 
            </p>
        </div>   
    )
}
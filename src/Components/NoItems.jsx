import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-lists.css";

export default function NoLists() {
    return (
        <div>
            <p className='line'></p>
            <div>
                <div className="no-items-body"> 
                    <p className="no-lists-label">
                        Your List is empty.
                    </p> 
                    <p className="no-list-instructions">
                        Add an Item to start your List
                    </p> 
                    <p className="no-list-instructions2">
                    
                    </p>
                    <p className="no-list-icon">
                    <FontAwesomeIcon icon={faList} /> 
                    </p>
                </div>  
            </div>
        </div>
     )   
}
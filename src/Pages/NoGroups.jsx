import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-groups.css";

export default function NoGroups() {
    return (
        <div className="body"> 
            <p className="no-groups">
                You have no Groups.
            </p> 
            <p className="create">
                Create your Groups here!
            </p> 
            <p className="add-new">
                Tap plus to create your first Group.
            </p> 
            <p className="icon">
            <FontAwesomeIcon icon={faUserGroup} /> 
            </p>
        </div>   
    )
}
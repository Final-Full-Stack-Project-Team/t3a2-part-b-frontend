import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup} from '@fortawesome/free-solid-svg-icons'
import "../Styles/no-groups.css";

export default function NoGroups() {
    return (
        <div className="no-groups-body"> 
            <p className="no-groups-label">
                You have no Groups.
            </p> 
            <p className="create-group-label">
                Create your Groups here!
            </p> 
            <p className="group-instructions-label">
                Tap plus to create your first Group.
            </p> 
            <p className="group-icon">
            <FontAwesomeIcon icon={faUserGroup} /> 
            </p>
        </div>   
    )
}
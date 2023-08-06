import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck} from '@fortawesome/free-solid-svg-icons'
import "../Styles/not-logged-in.css";

export default function NotLoggedIn() {
    return (
        <div className="not-logged-in-body"> 
            <p className="welcome-label">
                Welcome to MinimaList!.
            </p> 
            <p className="please-login-label">
                Please login to make a list.
            </p> 
            <p className="not-logged-in-instructions-label">
                To start, click "Login" in the menu.
            </p>
           
            <p className="completed-icon">
            <FontAwesomeIcon icon={faListCheck} /> 
            </p>
        </div>   
    )
}
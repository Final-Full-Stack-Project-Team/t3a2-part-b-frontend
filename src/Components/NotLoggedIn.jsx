import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck} from '@fortawesome/free-solid-svg-icons'
import "../Styles/not-logged-in.css";
import { Link } from 'react-router-dom';

export default function NotLoggedIn() {
    return (
        <div className="not-logged-in-body"> 
            <p className="not-logged-in-welcome-label">
                Welcome to MinimaList!
            </p> 
            <p className="please-login-label">
                Please login to make a list.
            </p> 
            <p className="not-logged-in-instructions-label">
                You can login by tapping <Link to='sign-in' className='login-here-link'>here</Link>
            </p>
           
            <p className="completed-icon">
            <FontAwesomeIcon icon={faListCheck} /> 
            </p>
        </div>   
    )
}
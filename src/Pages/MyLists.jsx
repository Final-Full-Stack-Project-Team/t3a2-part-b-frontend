import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import "../Styles/lists.css"
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices.js"
import { findAllLists } from "../services/ListServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import NoLists from "../Components/NoLists";
// import { useStartTyping } from "react-use";

export default function ListsPage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const [lists, setLists] = useState([])
    const userData = useUserData()
    const cookie = `Bearer ${cookies.authorization}`
    
    const handleLogout = () => {
        removeCookie('authorization')
        localStorage.clear()
    }
    
    useEffect(() => {
        let user = userData?._id
        if (user) {
            findUser(user)
            .then((response) => {
                if (!response._id) {
                    handleLogout()
                }
            })
        }
    // eslint-disable-next-line
    }, [])

    // Fetch data from the API when the component mounts
    useEffect(() => {
        let user = userData?._id
        if (user) {
            findAllLists(cookie)
            .then((response) => {
                setLists(response)
            })
        }
    // eslint-disable-next-line
    }, [])

     // State to track if the navigation menu is open or closed
     const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

     // Function to toggle the navigation menu state
     const toggleNavMenu = () => {
         setIsNavMenuOpen(prevState => !prevState);
     };

    return ( 
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                <header className="fake-header">
                    <p className="page-title">My Lists</p>
                    <p className="lists-count">{lists.length} List{lists.length !== 1 ? 's' : '' }</p>
                </header> 

                {/* IMPORTANT! All page content goes in the body class */}
                <div className="body">
                    {lists.length > 0 ? (lists.map((list) => {
                        return (
                            <div className="lists-container" key={list._id}>
                                <p className="lists-icon">
                                    <FontAwesomeIcon icon={faUserGroup} /> 
                                </p>
                                <Link to={`/list/${list._id}`} className="lists-label">
                                    {list.name}
                                </Link>
                            </div>
                        );
                    })    
                        ) : (
                            <NoLists/>
                        )}
                    </div>     
                </div>
            </div>
        )
    }
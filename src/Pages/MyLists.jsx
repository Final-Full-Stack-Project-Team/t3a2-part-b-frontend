import NavMenu from "../Components/NavMenu";
import "../Styles/lists.css"
import "../Styles/modal.css"
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices.js"
import { findAllLists } from "../services/ListServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import NoLists from "../Components/NoLists";
import PlusIcon from "../images/PlusIcon.svg";
import NotLoggedIn from "../Components/NotLoggedIn"
// import { useStartTyping } from "react-use";
import AddListModal from '../Components/AddListModal';

export default function ListsPage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const [lists, setLists] = useState([])
    const userData = useUserData()
    const cookie = `Bearer ${cookies.authorization}`
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        removeCookie('authorization')
        localStorage.clear()
    }

    useEffect(() => {
        if (cookies.authorization) {
            setIsLoggedIn(true)
        }
        // eslint-disable-next-line
        },[userData])
    
    // check for user in local storage and logout if not found.
    useEffect(() => {
        let user = userData?._id
        if (user) {
            setIsLoading(true);
            findUser(userData?.email)
            .then((response) => {
                if (!response._id) {
                    handleLogout()
                } else {
                    return findAllLists(cookie);
                }
            })
            
        }
    // eslint-disable-next-line
    }, [])

    // // Fetch data from the API when the component mounts
    useEffect(() => {
        let user = userData?._id
        if (user) {
            findAllLists(cookie)
            .then((response) => {
                const activeLists = response.filter((list) => list.isCompleted === false)
                setLists(activeLists)
            })
            .then((response) => {
                if (response) {
                  const activeLists = response.filter((list) => list.isCompleted === false);
                  setLists(activeLists);
                }
                setIsLoading(false); // Set loading to false after fetching data
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Set loading to false even if there's an error
              });
        }
    // eslint-disable-next-line
    }, [])

     // State to track if the navigation menu is open or closed
     const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

     // Function to toggle the navigation menu state
     const toggleNavMenu = () => {
         setIsNavMenuOpen(prevState => !prevState);
     };

     const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div>
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            {isLoggedIn ? (
                <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                    <header className="fake-header">
                        <p className="page-heading">My Lists</p>
                        <p className="page-sub-heading">
                            {isLoading ? "Calculating..." : `${lists.length} List${lists.length !== 1 ? 's' : ''}`}
                        </p>
                        <div className="new-list-btn">
                            <button onClick={openModal}>
                                <img src={PlusIcon} alt="PlusIcon" />
                            </button>
                        </div>
                    </header>
                    <div className="page-contents">
                        {isLoading ? (
                            <p className="loading-message">Loading Lists...</p>
                        ) : (
                            lists.length > 0 ? (
                                lists.map((list) => (
                                    <div className="lists-container" key={list._id}>
                                        <p className="lists-icon">
                                            <FontAwesomeIcon icon={faList} />
                                        </p>
                                        <Link to={`/list/${list._id}`} className="lists-label">
                                            {list.name}
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <NoLists />
                            )
                        )}
                    </div>
                </div>
            ) : (
                <NotLoggedIn/>
            )}
            {isModalOpen && <AddListModal closeModal={closeModal} />}
        </div>
    );
}
            
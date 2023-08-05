import NavMenu from "../Components/NavMenu";
import "../Styles/lists.css"
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices.js"
import { deleteList, editList, findAllLists } from "../services/ListServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import NoCompleted from "../Components/NoCompleted";
import DeleteList from "../Components/DeleteList";
// import { useStartTyping } from "react-use";

export default function ListsPage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const [lists, setLists] = useState([])
    const userData = useUserData()
    const cookie = `Bearer ${cookies.authorization}`
    // eslint-disable-next-line
    const navigate = useNavigate()

    const [displayDeleteForList, setDisplayDeleteForList] = useState(null);
    
    const handleLogout = () => {
        removeCookie('authorization')
        localStorage.clear()
    }
    
    useEffect(() => {
        let user = userData?.email
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
                const completedLists = response.filter((list) => list.isCompleted === true)
                setLists(completedLists)
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
    
     function handleShowDelete(listId) {
        setDisplayDeleteForList(listId);
    }

    async function handleDeleteList(_id) {
        await deleteList(_id, cookie)
        handleShowDelete()
        window.location.reload()
    }

    async function handleSetActiveList(_id) {
        const data = {isCompleted: false}
        await editList(_id, data, cookie)
        window.location.reload()
    }

    return ( 
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                <header className="fake-header">
                    <p className="page-heading">Completed Lists</p>
                    <p className="page-sub-heading">{lists.length} List{lists.length !== 1 ? 's' : '' }</p>
                </header> 

                <div className="page-contents">
                    {lists.length > 0 ? (lists.map((list) => {
                        return (
                            <div className="completed-lists-container" key={list._id}>
                                <p className="lists-icon">
                                    <FontAwesomeIcon icon={faSquareCheck} /> 
                                </p>
                                <p className="lists-label">
                                    {list.name}
                                </p>
                                <div className="completed-icons">
                                    <button
                                        className="completed-restore-icon"
                                        onClick={() => handleSetActiveList(list._id)}
                                        style={{ marginLeft: "50px" }}
                                    >
                                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                                    </button>
                                    <button
                                        className="completed-trash-icon"
                                        onClick={() => handleShowDelete(list._id)}
                                        style={{ marginLeft: "50px" }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    
                                </div> 
                                {displayDeleteForList === list._id && (
                                        <DeleteList
                                            handleCancel={() => handleShowDelete(null)}
                                            handleDelete={() => handleDeleteList(list._id)}
                                        />
                                    )}
                            </div>
                        );
                    })    
                        ) : (
                            <NoCompleted/>
                        )}
                    </div>     
                </div>
            </div>
        )
    }
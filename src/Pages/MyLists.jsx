import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices.js"
import { findAllLists } from "../services/ListServices";
import { useStartTyping } from "react-use";

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

    useEffect(() => {
        let user = userData?._id
        if (user) {
            findAllLists(cookie)
            .then((response) => {
                setLists(response)
            })
        }
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
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>

            <div className="all-content">
                <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                    <header className="fake-header">
                        <p className="page-title">My Lists</p>
                    </header> 

                    {/* Conditionally render lists or "no lists" message */}
                    {lists.length > 0 ? (
                        lists.map((list) => (
                            /* IMPORTANT! All page content goes in the body class (so the text is white) */
                            <div className="body" key={list._id}>
                                <p>{list.name}</p>
                            </div>
                        ))
                    ) : (
                        <div className="body">
                            <p>You have no lists</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
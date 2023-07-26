import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { findUser } from "../services/UserServices.js"


export default function Homepage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const userData = useUserData()

    // State to track if the navigation menu is open or closed
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Function to toggle the navigation menu state
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prevState => !prevState);
    };
    
    const handleLogout = () => {
        removeCookie('authorization')
        localStorage.clear()
    }

    useEffect(() => {
        let user = userData?._id
        if (user) {
            console.log(userData)
            findUser(user)
            .then((response) => {
                if (!response._id) {
                    handleLogout()
                }
            })
        }
    // eslint-disable-next-line
    }, [])

    return ( 
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className="all-content">
                <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                    <header className="fake-header">
                        <p className="page-title">My Lists</p>
                    </header>
                    
                    {/* IMPORTANT! All page content goes in the body tag */}

                    <body className="body">
                        <p>list 1 test</p>
                        <p>list 2 test</p>
                        <p>list 3 test</p>
                        <p>list 4 test</p>
                        <p>list 5 test</p>
                        <p>list 6 test</p>
                        <p>list 7 test</p>
                    </body>
                </div>
            </div>
        </div>
    )
}
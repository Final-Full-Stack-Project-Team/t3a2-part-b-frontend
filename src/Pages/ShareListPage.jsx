import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../contexts/UserContext";
import { findList } from "../services/ListServices";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ShareList from "../Components/ShareList";
import NavMenu from "../Components/NavMenu";



export default function ShareListPage() {

    const userData = useUserData()
    const _id = useParams()
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    useEffect(() => {
        checkUser()
    }, [])
    
    const checkUser = async () => {
        await findList(_id._id, cookie)
        .then((response) => {
            if (response.admin !== userData._id) {
                navigate('/')
            }
        })
    }

    // State to track if the navigation menu is open or closed
   const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

   // Function to toggle the navigation menu state
   const toggleNavMenu = () => {
       setIsNavMenuOpen(prevState => !prevState);
   };
   

    return(
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} /> 
            </div>  
            <div className={isNavMenuOpen ? 'nav-closed' : 'nav-open'}>
                <header className="fake-header">
                    <p className="list-page-heading">Share List</p>
                    <p className="page-sub-heading">Select a group </p>
                </header>
                <p className="share-list-instructions">Share With:</p>
                <div className="share-list-details-body">
                    <ShareList />
                </div>
            </div>
    </div>
)}   
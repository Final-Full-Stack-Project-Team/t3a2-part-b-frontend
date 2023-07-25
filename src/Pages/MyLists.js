import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import { useCookies } from "react-cookie"
import { useUserData } from "../contexts/UserContext"
import { useEffect } from "react"
import { findUser } from "../services/UserServices.js"

export default function Homepage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const userData = useUserData()
    
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
                <NavMenu/>
            </div>
            <div className="contents">
            <p>My Lists</p>
            </div>
        </div>
    )
}
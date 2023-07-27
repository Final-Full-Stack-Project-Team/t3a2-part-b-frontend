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

    return ( 
        <div>
            <div>
                <NavMenu/>
            </div>
            <div className="contents">
            <p>My Lists</p>
            </div>
            {lists.map((list) => {
                return(
                <div>
                    <p>{list.name}</p>
                </div>
                )
            })}

        </div>
    )
}
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
            <h1>This page is only to store code that checks an existing user. Will be moved when we have a better page to put it</h1>
        </div>
    )
}
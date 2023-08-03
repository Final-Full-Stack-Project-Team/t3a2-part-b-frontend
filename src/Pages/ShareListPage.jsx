import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../contexts/UserContext";
import { findList } from "../services/ListServices";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ShareList from "../Components/ShareList";


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

    
    return(
        <div>
            <div style={{color: "white"}}>
                <Link>BACK X</Link>
                <h1>Share List</h1>
                <Link>GROUPS ICON</Link>
            </div>
            <div>
                <ShareList />
            </div>
        </div>
    )
}   
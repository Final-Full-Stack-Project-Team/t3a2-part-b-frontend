import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { findList } from "../services/ListServices"
import { useUserData } from "../contexts/UserContext"
import { useCookies } from "react-cookie"
import { findAllItemsFromList } from "../services/ItemServices"


export default function ListPage() {

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`
    const _id = useParams()
    const userData = useUserData()

    const [items, setItems] = useState([])
    const [list, setList] = useState()

    const [checkedItems, setCheckedItems] = useState({})

    useEffect(() => {
        let user = userData?._id
        if (user) {
            findList(_id._id, cookie)
            .then((response) => {
                setList(response)
            })
        }
    }, [])

    useEffect(() => {
        if (list) {
            findAllItemsFromList(_id._id, cookie)
            .then((response) => {
                setItems(response)
            })
        }
    }, [list])

    function checkItem(item) {
        setCheckedItems(prevCheckedItems => ({
          ...prevCheckedItems,
          [item._id]: !prevCheckedItems[item._id] // Toggle the checked state
        }));
      }

    return (
        <div>
            {items && items.map((item) => {
                return (
                    <div key={item._id}>
                        <input type="checkbox" onChange={() => (checkItem(item))} />
                        <p style={{ color:"white", textDecoration: checkedItems[item._id] ? "line-through": "none" }}>{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
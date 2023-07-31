import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { editList, findList } from "../services/ListServices"
import { useUserData } from "../contexts/UserContext"
import { useCookies } from "react-cookie"
import { findAllItemsFromList } from "../services/ItemServices"
import ListOptions from "../Components/ListOptions"
import { Link } from "react-router-dom"

export default function ListPage() {

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`
    const _id = useParams()
    const userData = useUserData()
    const navigate = useNavigate()

    const [items, setItems] = useState([])
    const [list, setList] = useState()

    const [showOptions, setShowOptions] = useState(false)
    const [renameList, setRenameList] = useState(false)
    const inputRef = useRef(null)

    const [listName, setListName] = useState('')

    const [checkedItems, setCheckedItems] = useState({})

    useEffect(() => {
        let user = userData?._id
        if (user) {
            findList(_id._id, cookie)
            .then((response) => {
                setList(response)
                console.log(response)
            })
        }
    }, [])

    useEffect(() => {
        if (list) {
            findAllItemsFromList(_id._id, cookie)
            .then((response) => {
                setItems(response)
            })
            setListName(list.name)
        }
    }, [list])

    useEffect(() => {
        if (renameList) {
            inputRef.current.focus()
        }
    }, [renameList])

    function handleOptions() {
        setShowOptions(!showOptions)
    }
 
    function checkItem(item) {
        setCheckedItems(prevCheckedItems => ({
          ...prevCheckedItems,
          [item._id]: !prevCheckedItems[item._id]
        }));
      }
    
    function handleRenameList() {
        setRenameList(!renameList)
    }

    function handleRename(event) {
        setListName(event.target.value)
    }

    async function handleRenameSubmit() {
        const data = {name: listName}
        await editList(_id._id, data, cookie)
        setRenameList(false)
        setShowOptions(false)
    }

    async function handleSetCompleteList() {
        const data = {isCompleted: true}
        await editList(_id._id, data, cookie)
        setShowOptions(false)
        navigate('/')
    }

    return (
        <div>
            <div className="list-header">
                <Link to={"/"}>Back</Link>
                {renameList ? 
                    <div className="list-header">
                    <input type="text" onChange={handleRename} ref={inputRef} value={listName} />
                    <button onClick={handleRenameSubmit}>Tick</button>
                    </div>

                : 
                <h2>{list && listName}</h2>}
                <button>Add people</button>
                <button onClick={handleOptions}>Options</button>
            </div>
            {showOptions && <ListOptions handleRename={handleRenameList} handleCompleted={handleSetCompleteList} />}
            {items && items.map((item) => {
                return (
                    <div className="list-items" key={item._id}>
                        <input type="checkbox" onChange={() => (checkItem(item))} />
                        <p style={{ color:"white", textDecoration: checkedItems[item._id] ? "line-through": "none" }}>{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
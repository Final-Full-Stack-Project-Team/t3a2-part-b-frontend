import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { AddItem, GetAllItems } from "../services/ItemServices"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "../Styles/list-page.css";

export default function FindItem(props) {

    const [items, setItems] = useState([])
    const [itemInput, setItemInput] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies()
    const [showItems, setShowItems] = useState(false) // Track whether to show items
    const cookie = `Bearer ${cookies.authorization}`

    /*useEffect(() => {
        GetAllItems(cookie)
        .then((response) => {
            setItems(response)
        })
    }, []) */

    function handleInputChange(event) {
        setItemInput(event.target.value)
        setShowItems(true) // Show items when input changes
    }

    /*const filteredItems = itemInput ? items.filter((item) => 
        item.name.toLowerCase().includes(itemInput.toLowerCase())  
    ) : [] */

    /*const handleAddItemToDB = async () => {
        const data = {name: itemInput}
        const response = await AddItem(cookie, data)
        const newItemArray = [...items, response]
        setItems(newItemArray)
        props.addItem(response)
        setItemInput('') // Clear input
        setShowItems(false) // Hide items after adding
    } */

    const handleAddItemToList = () => {
        const item = {
            name: itemInput
        }
        props.addItem(item)
        setShowItems(false) // Hide items after selecting
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAddItemToList();
        }
    }

    return (
        <div>
            <div className="item-input">
                <button className="item-icon" onClick={handleAddItemToList}><FontAwesomeIcon icon={faPlus} /></button>
                <input className="add-item" onChange={handleInputChange} onKeyDown={handleKeyPress} placeholder="Add Item" value={itemInput} type="text" />
            </div>
        </div>
    )
}

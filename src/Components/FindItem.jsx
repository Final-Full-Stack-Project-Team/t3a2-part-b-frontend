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
    const cookie = `Bearer ${cookies.authorization}`

    useEffect(() => {
        GetAllItems(cookie)
        .then((response) => {
            setItems(response)
        })
    }, [])

    function handleInputChange(event) {
        setItemInput(event.target.value)
    }

    const filteredItems = itemInput ? items.filter((item) => 
        item.name.toLowerCase().includes(itemInput.toLowerCase())  
    ) : []

    const handleAddItemToDB = async () => {
        const data = {name: itemInput}
        const response = await AddItem(cookie, data)
        const newItemArray = [...items, response]
        setItems(newItemArray)
        props.addItem(response)
        console.log(response)
    }

    const handleAddItemToList = (item) => {
        props.addItem(item)
    }

    return(
        <div>
            <div className="item-input">
                <button className="item-icon" onClick={handleAddItemToDB}><FontAwesomeIcon icon={faPlus}/></button>
                <input className="add-item" onChange={handleInputChange} placeholder="Add Item" value={itemInput} type="text"  />
            </div>
            {filteredItems.length > 0 && (
            <div className="item-display-overlay">
                {filteredItems.map((item) => {
                    return(
                    <div className="item-display-single-item" key={item._id}>
                        <p onClick={() => handleAddItemToList(item)} >{item.name}</p>
                    </div>
                    )
                })}
            </div>
            )}
        </div>
        
    )
}
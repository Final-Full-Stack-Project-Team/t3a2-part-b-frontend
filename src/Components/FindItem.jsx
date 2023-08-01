import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { AddItem, GetAllItems } from "../services/ItemServices"


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
                <button onClick={handleAddItemToDB}>PLUS ICON</button>
                <input onChange={handleInputChange} value={itemInput} type="text" />
            </div>
            <div className="item-display-overlay">
                {filteredItems.map((item) => {
                    return(
                    <div key={item._id}>
                        <p onClick={() => handleAddItemToList(item)} style={{ color: "white" }}>{item.name}</p>
                    </div>
                    )
                })}
            </div>
        </div>
        
    )
}
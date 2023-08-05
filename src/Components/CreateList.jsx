import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/UserContext";
import { createList } from "../services/ListServices";
import { useCookies } from "react-cookie";


export default function CreateList() {

    const [listName, setListName] = useState('')
    const [listError, setListError] = useState('')

    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    const userData = useUserData()

    const navigate = useNavigate()

    function handleListNameChange(event) {
        setListName(event.target.value)
    }

    async function submitCreateList() {

        if (listName.trim('') === '') {
            console.log("this is happening")
            setListError('Please enter a list name')
            setTimeout(() => {
                setListError('')
                return
            }, 3000)
            
        } else {
            const data = {
                admin: userData._id,
                name: listName
            }
            await createList(cookie, data)
            navigate('/')
        }
    }
    
    function handleKeyDown(event) {
        if (event.key === "Enter") {
          submitCreateList();
        }
      }
    
    return(
        <div className="new-list-body">
                <div className="new-list-label">
                    <label className="new-list-label" htmlFor="listname">Create new list</label>
                    <input label="sfasf" className="new-list" type="text" placeholder="List name" value={listName} onChange={handleListNameChange} onKeyDown={handleKeyDown}></input>
                </div>
                <button className='nl-update-button' onClick={submitCreateList}>CREATE</button>
            <div ><Link className='nl-cancel' to={'/'}>CANCEL</Link></div>
            {listError && <div>{listError}</div>}
        </div>
    )
}
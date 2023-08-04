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
            setListError('Please enter a list name')
            setTimeout(() => {
                setListError('')
                return
            }, 3000)
        }

        const data = {
            admin: userData._id,
            name: listName
        }

        const response = await createList(cookie, data)
        console.log(response)
    }
    
    return(
        <div className="new-list-body">
            <form>
                <div className="new-list-label">
                    <label className="new-list-label" for="listname">Create new list</label>
                    <input label="sfasf" className="new-list" type="text" placeholder="List name" value={listName} onChange={handleListNameChange}></input>
                </div>
                
                <div ><Link className='nl-cancel' to={'/'}>CANCEL</Link></div>
                
            </form>
            <Link to="/" className='nl-update-button' onClick={submitCreateList}>CREATE</Link>
            {listError && <div>{listError}</div>}
        </div>
    )
}
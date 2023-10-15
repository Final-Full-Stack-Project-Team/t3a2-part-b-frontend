import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/UserContext";
import { createList } from "../services/ListServices";
import { useCookies } from "react-cookie";
import "../Styles/create-list.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


export default function CreateList() {

    // local state variables
    const [listName, setListName] = useState('')
    const [listError, setListError] = useState('')

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`

    // user data hook to access user data
    const userData = useUserData()

    const navigate = useNavigate()

    // function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
    function handleListNameChange(event) {
        const capitalizedListName = capitalizeFirstLetter(event.target.value);
        setListName(capitalizedListName)
    }

    async function submitCreateListAndShare() {
        // check if list name is left empty
        if (listName.trim('') === '') {
            setListError('A list name is required.')
            setTimeout(() => {
                setListError('')
                return
            }, 3000)
            
        } else {
            // Build data for fetch request
            const data = {
                admin: userData._id,
                name: listName
            }
            // fetch request
            const response = await createList(cookie, data);

            if (response && response._id) {
                const newListPath = `/list/${response._id}/share`;
                navigate(newListPath)
            } else {
                console.log ("List creation failed.")
            }
        }
    }

    async function submitCreateList() {
        // check if list name is left empty
        if (listName.trim('') === '') {
            setListError('A list name is required.')
            setTimeout(() => {
                setListError('')
                return
            }, 3000)
            
        } else {
            // Build data for fetch request
            const data = {
                admin: userData._id,
                name: listName
            }
            // fetch request
            const response = await createList(cookie, data);

            if (response && response._id) {
                const newListPath = `/list/${response._id}`;
                navigate(newListPath)
            } else {
                console.log ("List creation failed.")
            }
        }
    }
    
    // Picks up enter key press to run the submit function
    function handleKeyDown(event) {
        if (event.key === "Enter") {
          submitCreateList();
        }
      }
    
    return(
        
        <div className="create-list-body">
                
                <div className="create-new-list-label">
                    <label className="create-new-list-label" htmlFor="listname">Create new list</label>
                    <input className="create-list-name" type="text" placeholder="List name" value={listName} onChange={handleListNameChange} onKeyDown={handleKeyDown}></input>
                    
                </div>
                {listError && <div className="new-list-no-name-error">{listError}</div>}
                <div className='create-list-buttons'>
                    {/* <Link className='create-list-cancel-button' to={"/"}>CANCEL</Link> */}
                    <button className='create-list-share-button' onClick={submitCreateListAndShare}>SHARE LIST</button>
                    <button className='create-list-create-button' onClick={submitCreateList}>CREATE LIST</button>
                </div>
            
        </div>
    )
}
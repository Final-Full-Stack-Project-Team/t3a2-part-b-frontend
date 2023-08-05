import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { deleteList, editList, findList } from "../services/ListServices"
import { useUserData } from "../contexts/UserContext"
import { useCookies } from "react-cookie"
import { findAllItemsFromList } from "../services/ItemServices"
import ListOptions from "../Components/ListOptions"
import DeleteList from "../Components/DeleteList"
import FindItem from "../Components/FindItem"
import NavMenu from "../Components/NavMenu";
import NoItems from "../Components/NoItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUserPlus, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'
import "../Styles/list-page.css";
import { Link } from "react-router-dom"

export default function ListPage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`
    const _id = useParams()
    const userData = useUserData()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [items, setItems] = useState([])
    const [list, setList] = useState()

    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [renameList, setRenameList] = useState(false)
    const inputRef = useRef(null)

    const [listName, setListName] = useState('')
    
    const [checkedItems, setCheckedItems] = useState(() => {
      // Get checked items from localStorage or initialize as an empty object
      const storedCheckedItems = localStorage.getItem("checkedItems");
      return storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
    });

    

    // testing press enter
    const [updatedListName, setUpdatedListName] = useState(""); 

    useEffect(() => {
        let user = userData?.email
        if (user) {
            findList(_id._id, cookie)
            .then((response) => {
                setList(response)
            })
        }
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (list) {
            findAllItemsFromList(_id._id, cookie)
            .then((response) => {
                setItems(response)
            })
            setListName(list.name)
            // testing press enter
            setUpdatedListName(list.name);
        }
    // eslint-disable-next-line
    }, [list])

    useEffect(() => {
        if (renameList) {
            inputRef.current.focus()
        }
    }, [renameList])

    function handleOptions() {
        setShowOptions(!showOptions)
    }

    function handleShowDelete() {
        setShowDelete(!showDelete)
        setShowOptions(false)
    }
    
    function checkItem(item) {
      const updatedCheckedItems = {
        ...checkedItems,
        [item._id]: !checkedItems[item._id]
      };
      // Update state and store the checked items in localStorage
      setCheckedItems(updatedCheckedItems);
      localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));
  }
      
      
    
    function handleRenameList() {
        setRenameList(!renameList)
    }

    function handleRename(event) {
        setUpdatedListName(event.target.value)
    }

   

    async function handleRenameSubmit() {
      // testing press enter
      if (updatedListName !== listName) {
        const data = {name: updatedListName }
        await editList(_id._id, data, cookie)
        setRenameList(false)
        setShowOptions(false)
        // testing press enter
        setListName(updatedListName);
    }}

    async function handleSetCompleteList() {
        const data = {isCompleted: true}
        await editList(_id._id, data, cookie)
        setShowOptions(false)
        navigate('/')
    }

    async function handleDeleteList() {
        await deleteList(_id._id, cookie)
        handleShowDelete()
        navigate('/')
    }
    async function addItemToList(item) {
      const isItemAlreadyAdded = items.some(existingItem => existingItem.name === item.name);
    
      if (isItemAlreadyAdded) {
        console.log("Item already exists in the list");
        return;
      }
    
      const data = {
        items: [...items.map(item => item._id), item._id]
      };

      console.log(data)

    
      try {
        const response = await editList(_id._id, data, cookie);
    
        // Make sure the response from the API includes the updated list
        const updatedList = response;
    
        // Use the updated list's items for setting state
        setItems(updatedList.items);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }

     // State to track if the navigation menu is open or closed
   const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

   // Function to toggle the navigation menu state
   const toggleNavMenu = () => {
       setIsNavMenuOpen(prevState => !prevState);
   };
  //  New line here
   const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRenameSubmit();
    }
  };

  const handleRemoveItemFromList = async (itemId) => {
    const newItemsArray = items.filter((item) => item._id !== itemId)
    setItems(newItemsArray)

    const data = {
      items: newItemsArray.map(item => item._id)
    }

    console.log(data)

    const response = await editList(_id._id, data, cookie)

    console.log(response)
  }

   return (
    <div>
      <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
      <div className={isNavMenuOpen ? "nav-closed" : "nav-open"}>
        <header className="fake-header">
            <div className="list-page-heading">
            {renameList ? (
              <div>
                <input
                  className="edit-list-name"
                  type="text"
                  value={updatedListName} // Use the updatedListName state
                  onChange={handleRename}
                  onKeyDown={handleKeyPress} // Add the keydown event listener
                  ref={inputRef}
                  placeholder= "New List name.."
                ></input>
                
              </div>
            ) : (
              <p className="list-page-title">{list && listName}</p>
            )}
            {/* Add buttons to the list-buttons div */}
            <div className="list-buttons">
              <button className="add-person"><Link to={`${location.pathname}/share`}><FontAwesomeIcon className="add-person-icon" icon={faUserPlus} size="1x"/></Link></button>
              <button className="list-options" onClick={handleOptions}>
              <FontAwesomeIcon icon={faEllipsisVertical} size="2x" />
              </button>
            </div>
          </div>
          <p className="page-sub-heading">{items.length} item{items.length !== 1 ? 's' : ''} </p>
        </header>
        {list && listName ? (
        <div className="list-details-body">
          
          <FindItem addItem={addItemToList} items={items} />
          {showDelete && (
            <DeleteList
              handleCancel={handleShowDelete}
              handleDelete={handleDeleteList}
            />
          )}
          {showOptions && (
            <ListOptions 
              handleRename={handleRenameList}
              handleCompleted={handleSetCompleteList}
              handleDelete={handleShowDelete}
            />
          )}
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return (
                <div
                  className={`list-items ${index === 0 ? "first-item" : ""}`}
                  key={item._id}>
                  <input className="checkbox" type="checkbox" onChange={() => checkItem(item)} checked={checkedItems[item._id]}></input>
                  <div className="list-icons">
                    <FontAwesomeIcon onClick={() => handleRemoveItemFromList(item._id)} className="remove-icon"icon={faX} />
                  </div>
                  {/* Call handleCheckToggle with the item's _id when the icon is clicked */}
                 
                  
                  <p
                    className="list-items-label"
                    style={{
                      textDecoration: checkedItems[item._id]
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })
          ) : (
            <NoItems/>
          )}
        </div>
      ) : null}
    </div>
  </div>
);}
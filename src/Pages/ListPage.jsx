import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { deleteList, editList, findList } from "../services/ListServices"
import { useUserData } from "../contexts/UserContext"
import { useCookies } from "react-cookie"
import ListOptions from "../Components/ListOptions"
import DeleteList from "../Components/DeleteList"
import FindItem from "../Components/FindItem"
import NavMenu from "../Components/NavMenu";
import NoItems from "../Components/NoItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons'
import "../Styles/list-page.css";
import { Link } from "react-router-dom"

export default function ListPage() {
    // local state variables saved here
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies()
    const cookie = `Bearer ${cookies.authorization}`
    const _id = useParams()
    const userData = useUserData()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [items, setItems] = useState([])
    const [list, setList] = useState()

    // displaying boolean state variables here
    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [renameList, setRenameList] = useState(false)
    const inputRef = useRef(null)

    const [listName, setListName] = useState('')
    
    const [checkedItems, setCheckedItems] = useState({})

    

    // testing press enter
    const [updatedListName, setUpdatedListName] = useState(""); 

    // check for user and display the list page from the params
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

    // if list is found, set the list items to local state
    useEffect(() => {
        if (list) {
          setItems(list.items)
          setListName(list.name)
            // testing press enter
            setUpdatedListName(list.name);
        }
    // eslint-disable-next-line
    }, [list])

    // changes focus of rename list when clicked to the input
    useEffect(() => {
        if (renameList) {
            inputRef.current.focus()
        }
    }, [renameList])

    useEffect(() => {
      // Create a new object to store the checked status for each item
      const updatedCheckedItems = {};
      
      // Loop through the items array to set the checked status for each item
      items.forEach((item) => {
        updatedCheckedItems[item._id] = item.checked;
      });
      
      // Update the checkedItems state with the new object
      setCheckedItems(updatedCheckedItems);
    }, [items]);


    function handleOptions() {
        setShowOptions(!showOptions)
    }

    function handleShowDelete() {
        setShowDelete(!showDelete)
        setShowOptions(false)
    }
    
    // handles the mapped items being checked
    function checkItem(item) {
      const newCheckedStatus = !checkedItems[item._id]

      const updatedCheckedItems = {
        ...checkedItems,
        [item._id]: newCheckedStatus
      };

      setCheckedItems(updatedCheckedItems);

      // gets the checked and maps their id and checked status
      const updatedItems = items.map((existingItem) =>
      existingItem._id === item._id
        ? { ...existingItem, checked: newCheckedStatus }
        : existingItem
    );
  
      // build data object with results
      const data = {
        items: updatedItems
      }

      // fetch request edit list with new checked status
      editList(_id._id, data, cookie)
      .then((response) => {
        // set local state with the response from back end
        setItems(response.items)
      })
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
        // set list data isCompleted
        const data = {isCompleted: true}
        //send new data to back end
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
        items: [...items, item]
      };

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

  const handleRemoveItemFromList = async (itemToRemove) => {
    const newItemsArray = items.filter((item) => item.name !== itemToRemove)
    setItems(newItemsArray)

    const data = {
      items: newItemsArray
    }

    await editList(_id._id, data, cookie)

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
            {userData._id === list?.admin &&
            <div className="list-buttons">
              <button><Link to={`${location.pathname}/share`} className="add-person"><FontAwesomeIcon className="add-person-icon" icon={faUserPlus} size="1x"/></Link></button>
              <button className="list-options" onClick={handleOptions}>
              <FontAwesomeIcon icon={faEllipsisVertical} size="2x" />
              </button>
            </div>
            }
          </div>
          <p className="page-sub-heading">{items?.length} item{items?.length !== 1 ? 's' : ''} </p>
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
                    <FontAwesomeIcon onClick={() => handleRemoveItemFromList(item.name)} className="remove-icon"icon={faX} />
                  </div>
                  {/* Call handleCheckToggle with the item's _id when the icon is clicked */}
                 
                  
                    <p
                      className="list-items-label"
                      style={{
                        textDecoration: checkedItems[item._id] ? "line-through" : "none",
                        color: checkedItems[item._id] ? "#8c8c8c" : "inherit", // Change color based on checkbox state
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
import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "react-use"
import { userReducer } from "../reducers/UserReducer"
import { initialItemData } from "../data/InitialItemData"

export const ItemDataContext = createContext(null)
export const ItemDispatchContext = createContext(null)

// Custom hook for read only data
export function useItemData() {
    return useContext(ItemDataContext)
}

// Custom hook for write/dispatch data
export function useItemDispatch() {
    return useContext(ItemDispatchContext)
}

export default function ItemProvider(props) {

    const [itemData, itemDispatch] = useReducer(userReducer, initialItemData)

    const [persistantData, setPersistantData] = useLocalStorage('items', initialItemData)

    useEffect(() => {
        itemDispatch({type:"setup", data: persistantData})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Autosaves changes to noted from reducer state into localstorage
    useEffect(() => {
        setPersistantData(itemData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemData])

    return(
        <ItemDataContext.Provider value={itemData}>
            <ItemDispatchContext.Provider value={itemDispatch}>
                {props.children}
            </ItemDispatchContext.Provider>
        </ItemDataContext.Provider>
    )
}
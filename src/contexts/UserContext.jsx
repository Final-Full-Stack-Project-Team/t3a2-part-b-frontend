import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "react-use"
import { userReducer } from "../reducers/UserReducer"
import { initialUserData } from "../data/InitialUserData"

export const UserDataContext = createContext(null)
export const UserDispatchContext = createContext(null)

// Custom hook for read only data
export function useUserData() {
    return useContext(UserDataContext)
}

// Custom hook for write/dispatch data
export function useUserDispatch() {
    return useContext(UserDispatchContext)
}

export default function UserProvider(props) {

    const [userData, userDispatch] = useReducer(userReducer, initialUserData)

    const [persistantData, setPersistantData] = useLocalStorage('user', initialUserData)

    useEffect(() => {
        userDispatch({type:"setup", data: persistantData})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Autosaves changes to noted from reducer state into localstorage
    useEffect(() => {
        setPersistantData(userData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    return(
        <UserDataContext.Provider value={userData}>
            <UserDispatchContext.Provider value={userDispatch}>
                {props.children}
            </UserDispatchContext.Provider>
        </UserDataContext.Provider>
    )
}
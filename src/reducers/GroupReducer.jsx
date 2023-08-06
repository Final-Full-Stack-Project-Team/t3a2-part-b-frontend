import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use"

// THIS REDUCER AND CONTEXT IS NOT IN USE

// FOR FUTURE DEVELOPMENT

const initialGroupsData = [
    {
		group_name: "Welcome to your Groups!",
		dateCreated: Date.now(),
		shared_with: [],
		admin: ""

    }
]

const groupsReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type){
        case "setup":
            //console.log("Apply persistent data to state now.");
            let localStorageData = instructions.data;
            stateEditable = localStorageData;
            return stateEditable;
        case "create":
            //console.log("Groups: Create groups and add to state");

            let newGroup = instructions.newGroup;
            stateEditable.push(newGroup)

            return stateEditable

        case "update name":
            //console.log("Groups: Update the Group's name");
            break;
        case "update members":
            //log("Groups: Update the Group's members");
            break;
        case "delete":
            //console.log("Groups: Delete a Group");
            break;
        default:
            //console.log("Invalid instruction");
            return previousState;
    }
}

export const GroupDataContext = createContext(null)
export const GroupDispatchContext = createContext(null)

export function useGroupData() {
    return useContext(GroupDataContext)
}

export function useGroupDispatch() {
    return useContext(GroupDispatchContext)
}

export default function GroupsProvider(props) {
    const [groupsData, groupsDispatch] = useReducer(groupsReducer, initialGroupsData)

    const [persistantData, setPersistantData] = useLocalStorage ("groups", initialGroupsData)

    useEffect(() => {
        groupsDispatch({type:"setup", data: persistantData});
        // Below comment is to ignore linter warning which prevents deployment on Netlify
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //console.log("local storage: " + persistantData);
    }, [persistantData]);

    useEffect(() => {
        setPersistantData(groupsData);
        // Below comment is to ignore linter warning which prevents deployment on Netlify
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupsData]);

    return(
        <GroupDataContext.Provider value={groupsData}>
            <GroupDispatchContext.Provider value={groupsDispatch}>
                {props.children}
            </GroupDispatchContext.Provider>
        </GroupDataContext.Provider>
    )
}
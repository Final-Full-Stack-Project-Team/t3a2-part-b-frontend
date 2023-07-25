export const userReducer = (previousState, instructions) => {
    let stateEditable = {...previousState}

    switch (instructions.type) {
        case "setup":
            let localStorageData = instructions.data
            stateEditable = localStorageData
            
            // Whatever is returned is the new state data
            return stateEditable
        
        case "login":
            const newUser = instructions.data

            stateEditable = newUser

            return stateEditable

        default:
            console.log("Invalid instruction")

    }
}
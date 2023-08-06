const api = 'http://localhost:3001'

export async function findList(data, cookie){
    const response = await fetch(`${api}/lists/${data}`, {
        method: "GET",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}

export async function findAllLists(cookie){
    const response = await fetch(`${api}/lists/`, {
        method: "GET",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}

export async function createList(cookie, data){
    const response = await fetch(`${api}/lists/create`, {
        method: "POST",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function editList(_id, data, cookie){
    const response = await fetch(`${api}/lists/modify/${_id}`, {
        method: "PUT",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function deleteList(_id, cookie){
    const response = await fetch(`${api}/lists/delete/${_id}`, {
        method: "DELETE",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}

export async function addUserToList(_id, cookie, data) {
    const response = await fetch(`${api}/lists/addUser/${_id}`, {
        method: "PUT",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

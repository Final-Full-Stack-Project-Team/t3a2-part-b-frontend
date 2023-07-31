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

export async function editList(_id, data, cookie){
    console.log(data)
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

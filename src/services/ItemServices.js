const api = 'http://localhost:3001'

export async function findAllItemsFromList(data, cookie){
    const response = await fetch(`${api}/items/list/${data}`, {
        method: "GET",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}
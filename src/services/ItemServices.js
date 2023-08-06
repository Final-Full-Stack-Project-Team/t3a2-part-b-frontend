const isProduction = process.env.NODE_ENV === 'production';
const api = isProduction ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3001';

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

export async function GetAllItems(cookie){
    const response = await fetch(`${api}/items`, {
        method: "GET",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}

export async function AddItem(cookie, data){
    const response = await fetch(`${api}/items/create`, {
        method: "POST",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
        body: JSON.stringify(data)
    })
    return response.json()
}


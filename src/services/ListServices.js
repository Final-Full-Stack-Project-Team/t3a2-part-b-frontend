import { useCookies } from "react-cookie"

const api = 'http://localhost:3001'

export async function findList(data){
    const response = await fetch(`${api}/lists/${data}`, {
        method: "GET",
        headers:{
            'Content-type':"application/json"
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
const api = 'http://localhost:3001';

export async function findGroup(data, cookie) {
  const response = await fetch(`${api}/groups/${data}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.json();
}

export async function findAllGroups(cookie){
    const response = await fetch(`${api}/groups/`, {
        method: "GET",
        headers:{
            'Content-type':"application/json",
            Authorization: cookie
        },
    })
    return response.json()
}

export async function createGroup(data, cookie){
  const response = await fetch(`${api}/groups/`, {
    method: "POST",
    headers:{
        'Content-type':"application/json",
        Authorization: cookie
    },
    body: JSON.stringify(data)
})
return response.json()
}

export async function updateGroup(data, cookie, _id){
  const response = await fetch(`${api}/groups/${_id}`, {
    method: "PUT",
    headers:{
        'Content-type':"application/json",
        Authorization: `Bearer ${cookie}`,
    },
    body: JSON.stringify(data)
})
return response.json()
}

export async function deleteGroup(cookie, _id){
  const response = await fetch(`${api}/groups/${_id}`, {
    method: "DELETE",
    headers:{
        'Content-type':"application/json",
        Authorization: `Bearer ${cookie}`,
    }
})
return response.json()
}


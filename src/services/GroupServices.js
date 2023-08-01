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

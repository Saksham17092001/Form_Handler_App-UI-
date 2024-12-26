const URL = 'http://localhost:3000/api'

export const login =(data)=>{
    return fetch(`${URL}/auth/login`,{
        method : 'POST',
        headers :{
           'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)

    })
}

export const register = (data)=>{
    return fetch(`${URL}/auth/register`,{
        method : 'POST',
        headers : {
           'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
}

export const getWorkspaceData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/folder/workspace`, {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in header
        },
    });
    if (!response.ok) throw new Error('Error fetching workspace data');
    return response.json();
};

// Create a new folder
export const createFolder = async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/folder/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error creating folder');
    return response.json();
};

export const deleteFolder = async (folderId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/folder/delete/${folderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Error deleting folder');
    return response.json();
};

export const updateUser = async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/auth/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error updating user');
    return response.json();
};

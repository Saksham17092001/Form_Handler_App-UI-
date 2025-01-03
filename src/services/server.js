const URL = import.meta.env.VITE_API_URL;

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

export const sendInvite = async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/share/invite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error sending invite');
    return response.json();
};

export const generateShareLink = async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/share/link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error generating share link');
    return response.json();
};


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

export const createForm = async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/form/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error creating form');
    return response.json();
};

export const updateForm = async (formId, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/form/update/${formId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error updating form');
    return response.json();
};

export const getForms = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/form/workspace`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) throw new Error('Error fetching forms');
    return response.json();
};

export const deleteForm = async (formId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/form/delete/${formId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) throw new Error('Error deleting form');
    return response.json();
};
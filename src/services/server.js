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
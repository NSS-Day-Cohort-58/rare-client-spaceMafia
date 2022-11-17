export const getUsers = () => {
    return fetch(`http://localhost:8000/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}
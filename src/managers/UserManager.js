export const getUsers = () => {
    return fetch(`http://localhost:8000/users`)
        .then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`)
    .then(res => res.json())

}
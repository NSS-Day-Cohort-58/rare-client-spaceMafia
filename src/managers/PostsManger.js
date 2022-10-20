export const getPosts = () => {
    return fetch('http://localhost:8088/posts')
        .then(response => response.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
        .then(res => res.json())
}
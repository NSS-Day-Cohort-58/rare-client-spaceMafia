export const getPosts = () => {
    return fetch('http://locahost:8088/posts')
            .then(response => response.json())
}
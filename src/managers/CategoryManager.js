export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`)
        .then(res => res.json())
}

export const createCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
}
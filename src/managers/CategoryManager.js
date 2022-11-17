export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            //"Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const createCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            //"Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(category)
    })
}

export const deleteCategory = (id) => {
     return fetch(`http://localhost:8000/categories/${id}`, {
         method: "DELETE",
         headers:{
             "Accept": "application/json",
             "Content-Type": "application/json",
             //"Authorization": `Token ${localStorage.getItem("lu_token")}`
         }
     })
 }
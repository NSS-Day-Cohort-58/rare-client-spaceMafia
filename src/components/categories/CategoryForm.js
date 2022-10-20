import { useEffect, useState, React } from "react"
import { useNavigate } from "react-router-dom"

export const CategoryForm = () => {
    
    const [category, createCategory] = useState({
        label: ""
    })

    const navigate = useNavigate()

    const createCategoryButton = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const categoryToSendToAPI = {
            label: category.label  
        }
    return fetch(`http://localhost:8088/categories`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryToSendToAPI)
    }
    .then(response => response.json())
    .then(() => {
        navigate("/categories")
    })

} 

return <form>
<div className="create-category_title">Create New Category</div>

</form>


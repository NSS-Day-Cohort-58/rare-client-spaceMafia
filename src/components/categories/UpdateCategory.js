import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { editCategory } from "../../managers/CategoryManager.js"
import { createCategory, getCategories, getCategoryById, updateCategory } from '../../managers/CategoryManager.js'


export const UpdateCategory = () => {
    const navigate = useNavigate()
    const {categoryId} = useParams()
    const [categories, setCategories] = useState([])
 
    const [newCategory, setNewCategory] = useState({
        label: "",
    })

    useEffect(() => {
        
        getCategoryById(categoryId)
        .then((response) => {
            setNewCategory(response)
        })
            
    }, []
    )

      const updatedCategory = (evt) => {
        evt.preventDefault()

        
        return editCategory(newCategory)
        .then(() => navigate(`/categories`))
    }

    return (
        <form className="categoryForm">
            <h2 className="categoryForm__label"></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Label: </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={newCategory.label}
                        onChange={
                            (evt) => {
                            const copy = structuredClone(newCategory)
                            copy.label = evt.target.value
                            setNewCategory(copy)
                        }}
                    />
                </div>
                </fieldset>
            <button onClick={(evt) => updatedCategory(evt)} className="btn btn-primary">
                Update Category
            </button>
        </form>
    )
}
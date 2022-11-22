import { useEffect, useState, React } from "react"
import { createCategory } from "../../managers/CategoryManager"
import './CategoryForm.css'

export const CategoryForm = () => {

    const [category, makeCategory] = useState({
        label: ""
    })


    const createCategoryButton = (event) => {
        event.preventDefault()

        const createdCategory = {
            label: category.label
        }

        createCategory(createdCategory)
            .then(() => { window.location.reload() })

    }

    return <form className="category_form mr-6">
        <h2 className="create-category_title">Create a Category</h2>
        <fieldset>
            <label htmlFor="category_label"></label>
            <input
                required autoFocus
                type="text"
                name="label"
                className="form-control"
                placeholder="Create a new Category"
                value={category.label}
                onChange={
                    (event) => {
                        const copy = structuredClone(category)
                        copy.label = event.target.value
                        makeCategory(copy)
                    }
                } />
        </fieldset>
        <button onClick={(event) => createCategoryButton(event)}
            className="create-category-button">

            Create Category</button>
    </form>

}
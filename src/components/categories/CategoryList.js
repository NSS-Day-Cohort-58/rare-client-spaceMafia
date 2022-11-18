import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCategories, deleteCategory, editCategory, getCategoryById } from "../../managers/CategoryManager"
import { CategoryForm } from "./CategoryForm"
import './CategoryList.css'

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const localForumUser = localStorage.getItem("forum_user")
    const forumUserObject = JSON.parse(localForumUser)

    useEffect (
        () => {
            getCategories()
            .then(data => setCategories(data))
        },
        []
    )

    const categoryDelete = (category) => {
        let text = 'Are you sure you want to delete this category?'
        window.confirm(text)
            ? deleteCategory(category.id).then(() => {window.location.reload()})
            : <></>
    }
//Check if we need this here or on the form
    const categoryEdit = (category) => {
        let text = 'Are you sure you want to edit this category?'
        window.confirm(text)
            ? navigate(`/categories/${category.id}/edit`)
            : <></>
    }

    return <section> <div className="category_title">Category List</div>
        {categories.map(category => {
            return <div key={`category--${category.id}`} className="category">
                <h3 className="category_label">{category.label}</h3>
        <button className="category__button button is-small is-responsive is-danger" 
        onClick={() => categoryDelete(category)}>Delete</button>    
        <button className="category__button button is-small is-responsive is-success" 
        onClick={() => categoryEdit(category)}>Edit</button> 
                <div>
                </div>
            </div>
        
        })

    }
    </section>
}


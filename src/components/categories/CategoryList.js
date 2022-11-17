import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCategories, deleteCategory } from "../../managers/CategoryManager"
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

    const categoryDelete = (evt, category) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete this category?'
        window.confirm(text)
            ? deleteCategory(category.id).then(() => {window.location.reload()})
            : <></>
    }

    return <section> <div className="category_title">Category List</div>
        {categories.map(category => {
            return <div key={`category--${category.id}`} className="category">
                <h3 className="category_label">{category.label}</h3>
        <button className="category__button button is-small is-responsive is-danger" 
        onClick={(evt) => categoryDelete(evt, category)}>Delete</button>     
                <div>
                </div>
            </div>
        
        })

    }
    </section>
}


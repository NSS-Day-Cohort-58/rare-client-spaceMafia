import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"

export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect (
        () => {
            getCategories()
            .then(data => setCategories(data))
        },
        []
    )

    return <section>
        {categories.map(category => {
            return <div key={`category--${category.id}`} className="category">
                <h3 className="category_label">{category.label}</h3>
                <div>
                </div>
            </div>
        
        })

    }
    </section>
}
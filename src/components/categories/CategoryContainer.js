import { CategoryForm } from "./CategoryForm"
import { CategoryList } from "./CategoryList"
import './CategoryContainer.css'

export const CategoryContainer = () => {

    return <section className="category_main">
    <CategoryForm />
    <CategoryList />
    </section>
   
}